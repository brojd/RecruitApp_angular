var mongojs = require("mongojs");
var fs = require('fs');
var uri = "mongodb://dominik791:mongo08@ds013290.mlab.com:13290/contour_project";
var db = mongojs(uri, ['clients', 'projects', 'candidates', 'others']);
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/* CLIENTS */


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

// get client by id
module.exports.getClientById = function(idOfClient, callback) {
    db.clients.find({_id: Number(idOfClient)}, function(err, client) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, client);
        }
    });
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

// get project by id
module.exports.getProjectById = function(idOfProject, callback) {
    db.projects.find({_id: Number(idOfProject)}, function(err, project) {
        console.log(project);
        if (err) {
            return callback(err);
        } else {
            return callback(null, project);
        }
    });
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


/* DETAILS OF PROJECT */


module.exports.getCandidates = function(callback) {
    db.candidates.find({}, function(err, candidates) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, candidates);
        }
    });
};

module.exports.saveCandidate = function(userData, idOfProject, callback) {
    db.others.find({}, function(err, docs) {
        if (err) {
            callback(err);
        } else {
            fs.readFile('candidateDetailsSkeleton.json', 'utf-8', function(err, details) {
                if (err) {
                    return console.log(err);
                } else {
                    db.candidates.insert({
                        '_id': docs[0].candidateID,
                        'name': userData.name,
                        'surname': userData.surname,
                        'projectsID': [idOfProject],
                        'details': JSON.parse(details)
                    }, function(err) {
                        if (err) {
                            callback(err);
                        } else {
                            db.others.update({}, { $inc: { candidateID: 1 }});
                            db.candidates.find({}, function(err, candidates) {
                                            if (err) {
                                                return callback(err);
                                            } else {
                                                return callback(null, candidates);
                                            }
                                        });
                        }
                    });
                }
            });
        }
    });
};

module.exports.removeCandidate = function(idOfCandidate, callback) {
    db.candidates.remove({ _id: Number(idOfCandidate) }, function(err) {
        if (err) {
            callback(err);
        } else {
            db.candidates.find({}, function(err, candidates) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, candidates);
                }
            });
        }
    });
};

module.exports.updateJobDesc = function(idOfProject, textProvided, callback) {
    db.projects.update({ _id: Number(idOfProject) }, { $set: { job_description: textProvided }}, function(err) {
        if (err) {
            callback(err);
        } else {
            db.projects.find({ _id: Number(idOfProject) }, function(err, project) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, project);
                }
            });
        }
    });
};


/* DETAILS OF CANDIDATE */


module.exports.getDetailsOfCandidate = function(idOfCandidate, callback) {
    db.candidates.find({ _id: Number(idOfCandidate) }, function(err, candidate) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, candidate);
        }
    });
};

module.exports.saveCandidateDetails = function(idOfCandidate, detailsProvided, callback) {
    db.candidates.update({ _id: Number(idOfCandidate) }, { $set: { details: detailsProvided }}, function(err) {
        if (err) {
            return callback(err);
        } else {
            db.candidates.find({ _id: Number(idOfCandidate) }, function(err, candidate) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, candidate);
                }
            });
        }
    });
};