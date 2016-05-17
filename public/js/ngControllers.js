

/* CLIENTS */


recruitApp.controller('clientsCtrl', function($scope, $http) {
    
    $scope.formData = {};
    
    $http.get('/clients')
        .success(function(data) {
            $scope.clients = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    $scope.createClient = function() {
        $http.post('/clients', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.clients = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.deleteClient = function(id) {
        var toDelete = confirm('Do you want to delete client?');
        if (toDelete) {
            $http.delete('/clients/' + id)
            .success(function(data) {
                $scope.clients = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    };
});


/* PROJECTS */


recruitApp.controller('projectsCtrl', function($scope, $http, $routeParams) {

    $scope.clientID = $routeParams.clientID;
    $scope.formData = {};
    
    $http({
        method: 'GET',
        url: '/client',
        params: {'clientID': $scope.clientID}
        })
        .success(function(data) {
            $scope.projects = data.projects;
            $scope.clientName = data.client[0].name;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    $scope.createProject = function() {
        $http.post('/client', {'formData': $scope.formData,
                               'clientID': $scope.clientID})
            .success(function(data) {
                $scope.projects = data;
                $scope.formData = {};
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.deleteProject = function(id) {
        var toDelete = confirm('Do you want to delete project?');
        if (toDelete) {
            $http.delete('/client/' + id)
            .success(function(data) {
                $scope.projects = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    };
});


/* DETAILS OF PROJECT */


recruitApp.controller('detailsOfProjectCtrl', function($scope, $http, $routeParams) {
    
    $scope.clientID = $routeParams.clientID;
    $scope.projectID = $routeParams.projectID;
    $scope.formData = {};
    
    $http({
        method: 'GET',
        url: '/detailsOfProject',
        params: {'clientID': $scope.clientID,
                 'projectID': $scope.projectID}
        })
        .success(function(data) {
            $scope.clientName = data.client[0].name;
            $scope.projectName = data.project[0].name;
            $scope.jobDescText = data.project[0].job_description;
            $scope.candidates = data.candidates;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    $scope.createCandidate = function() {
        $http.post('/detailsOfProject', {'formData': $scope.formData,
                                         'projectID': $scope.projectID})
        .success(function(data) {
            $scope.candidates = data;
            $scope.formData = {};
        })
        .error(function(data) {
            console.log('Error ' + data);
        });
    };
    
    $scope.deleteCandidate = function(idOfCandidate) {
        var toDelete = confirm('Do you want to delete candidate?');
        if (toDelete) {
            $http.delete('/detailsOfProject/' + idOfCandidate)
            .success(function(data) {
                $scope.candidates = data;
            });
        }
    };
    
    $scope.saveJobDesc = function() {
        $http({
            method: 'PUT',
            url: '/detailsOfProject',
            params: {'projectID': $scope.projectID,
                     'jobDescText': $scope.jobDescText}
            })
        .success(function(data) {
            console.log(data);
        })
        .error(function(data) {
            console.log('Error ' + data)
        });
    };
});


/* DETAILS OF CANDIDATE */


recruitApp.controller('detailsOfCandidateCtrl', function($scope, $http, $routeParams) {
    
    $scope.candidateID = $routeParams.candidateID;
    $scope.details = {};
    
    $http({
        method: 'GET',
        url: '/detailsOfCandidate',
        params: {'candidateID': $scope.candidateID}
        })
    .success(function(data) {
        $scope.details = data[0].details;
        $scope.nameOfCandidate = data[0].name;
        $scope.surnameOfCandidate = data[0].surname;
    });
    
    $scope.saveDetails = function() {
        $http.post('/detailsOfCandidate', {'details': $scope.details,
                                           'candidateID': $scope.candidateID})
        .success(function(data) {
            $scope.details = data[0].details;
        })
        .error(function(data) {
            console.log('Error ' + data);
        });
    };
    
    $scope.addForm = function(section) {
        var detailsSection = $scope.details[section.nameOfSection.toLowerCase()];
        detailsSection.nbOfForms.push(section.nbOfForms.length + 1);
        detailsSection['fields' + Number(section.nbOfForms.length)] = detailsSection.fields;
        console.log($scope.details);
    };
});