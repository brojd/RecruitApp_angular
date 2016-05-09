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


// return all clients' names
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
            });
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
    })
}


/* PROJECTS */