

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


/* CANDIDATES */


recruitApp.controller('candidatesCtrl', function($scope, $http, $routeParams) {
    
    $scope.clientID = $routeParams.clientID;
    $scope.projectID = $routeParams.projectID;
    $scope.formData = {};
    
    $http({
        method: 'GET',
        url: '/project',
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
        $http.post('/project', {'formData': $scope.formData,
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
            $http.delete('/candidate/' + idOfCandidate)
            .success(function(data) {
                $scope.candidates = data;
            });
        }
    };
    
    $scope.saveJobDesc = function() {
        $http({
            method: 'PUT',
            url: '/candidate',
            params: {'projectID': $scope.projectID,
                     'jobDescText': $scope.jobDescText}
            })
        .success(function(data) {
            console.log(data);
        });
    };

});