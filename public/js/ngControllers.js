

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
    
    $http.get('/client')
        .success(function(data) {
            var currentProjects = data['projects'].filter(function(project) {return project.clientID==$scope.clientID;});
            var currentClient = data['clients'].filter(function(client) {return client._id==$scope.clientID;});
            $scope.clientName = currentClient[0].name;
            $scope.projects = currentProjects;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    $scope.createProject = function() {
        $http.post('/client', {'formData': $scope.formData,
                               'clientID': $scope.clientID})
            .success(function(data) {
                var currentProjects = data.filter(function(project) {return project.clientID==$scope.clientID;});
                $scope.projects = currentProjects;
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