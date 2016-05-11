var mongojs = require("mongojs");
var uri = "mongodb://dominik791:mongo08@ds013290.mlab.com:13290/contour_project";
var db = mongojs(uri, ['clients', 'projects', 'candidates', 'others']);
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var ObjectId = require('mongodb').ObjectID;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/* CLIENT */


// return all clients
module.exports.getClients = function(callback) {
    db.clients.find({}, function(err, clients) {
                            if (err) {
                                return callback(err);
                            } else {
                                return callback(null, clients);
                            }
                        }
    );
};

// save client in database
module.exports.saveClient = function(name, callback) {
    db.others.find({}, function(err, docs) {
        if (err) {
            callback(err);
        } else {
            db.clients.insert({
                '_id': docs[0].clientID,
                'name': name
            }, function(err) {
                if (err) {
                    callback(err);
                } else {
                    db.others.update({}, { $inc: { clientID: 1 }});
                    db.clients.find({}, function(err, clients) {
                                    if (err) {
                                        return callback(err);
                                    } else {
                                        return callback(null, clients);
                                    }
                                });
                }
            });
        }
    });
};

// remove client from database
module.exports.removeClient = function(idOfClient, callback) {
    db.clients.remove({ _id: Number(idOfClient) }, function(err) {
        if (err) {
            callback(err);
        } else {
            db.clients.find({}, function(err, clients) {
                                    if (err) {
                                        return callback(err);
                                    } else {
                                        return callback(null, clients);
                                    }
                                }
            );
        }
    });
};


/* PROJECTS */


// return all projects
module.exports.getProjects = function(callback) {
    db.projects.find({}, function(err, projects) {
                            if (err) {
                                return callback(err);
                            } else {
                                return callback(null, projects);
                            }
                        }
    );
};

// save project in database
module.exports.saveProject = function(projectName, clientID, callback) {
    db.others.find({}, function(err, docs) {
        if (err) {
            callback(err);
        } else {
            db.projects.insert({
                '_id': docs[0].projectID,
                'name': projectName,
                'clientID': clientID,
                'job_description': ''
            }, function(err) {
                if (err) {
                    callback(err);
                } else {
                    db.others.update({}, { $inc: { projectID: 1 }});
                    db.projects.find({}, function(err, projects) {
                                    if (err) {
                                        return callback(err);
                                    } else {
                                        return callback(null, projects);
                                    }
                                });
                }
            });
        }
    });
};

// remove project from database
module.exports.removeProject = function(idOfProject, callback) {
    db.projects.remove({ _id: Number(idOfProject) }, function(err) {
        if (err) {
            callback(err);
        } else {
            db.projects.find({}, function(err, projects) {
                                    if (err) {
                                        return callback(err);
                                    } else {
                                        return callback(null, projects);
                                    }
                                }
            );
        }
    });
};