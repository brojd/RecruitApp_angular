var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var manageDB = require('./manageDB.js');


/* CONFIGURATION */


app.use(express.static('public'));
app.use('/scripts/angular', express.static(__dirname + '/node_modules/angular/'));
app.use('/scripts/angular-route', express.static(__dirname + '/node_modules/angular-route/'));
app.set('views', __dirname + '/public/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/* SERVER ROUTES */


// Clients

app.get('/clients', function(req, res) {
    manageDB.getClients(function(err, clients) {
        if (err) {
            throw new Error(err);
        } else {
            res.json(clients);
        }
    });
});

app.post('/clients', function(req, res) {
    manageDB.saveClient(req.body.clientName, function(err, clients) {
        if (err) {
            throw Error(err);
        } else {
            res.json(clients);
        }
    });
});

app['delete']('/clients/:client_id', function(req, res) {
    manageDB.removeClient(req.params.client_id, function(err, clients) {
        if (err) {
            throw Error(err);
        } else {
            res.json(clients);
        }
    });
});


// Projects

app.get('/client', function(req, res) {
    manageDB.getProjects(function(err, projects) {
        if (err) {
            throw Error(err);
        } else {
            manageDB.getClients(function(err, clients) {
                if (err) {
                    throw Error(err);
                } else {
                    var data = {'clients': clients,
                                'projects': projects};
                    console.log(data);
                    res.json(data);
                }
            })
            
        }
    });
});

app.post('/client', function(req, res) {
    var projectName = req.body.formData['projectName'];
    var clientID = req.body.clientID;
    manageDB.saveProject(projectName, clientID, function(err, projects) {
        if (err) {
            throw Error(err);
        } else {
            res.json(projects);
        }
    });
});

app['delete']('/client/:project_id', function(req, res) {
    manageDB.removeProject(req.params.project_id, function(err, projects) {
        if (err) {
            throw Error(err);
        } else {
            res.json(projects);
        }
    });
});


// FRONTEND ROUTE


app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});


/* RUN SERVER */


http.listen(3000, function(){
    console.log('listening on *:3000');
});