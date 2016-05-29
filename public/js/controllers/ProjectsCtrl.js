recruitApp.controller('projectsCtrl', function($http, $routeParams, $window) {
    
    $window.console = updateConsole($window.console);

    this.clientID = $routeParams.clientID;
    this.formData = {};
    this.goBack = function() {
        $window.history.back();
    };
    
    $http({
        method: 'GET',
        url: '/client',
        params: {'clientID': this.clientID}
        })
        .success(angular.bind(this, function(data) {
            this.projects = data.projects;
            this.clientName = data.client[0].name;
        }))
        .error(angular.bind(this, function(data) {
            console.log('Error: ' + data);
        }));
    
    this.createProject = function() {
        $http.post('/client', {'formData': this.formData,
                               'clientID': this.clientID})
        .success(angular.bind(this, function(data) {
            this.projects = data;
            this.formData = {};
         }))
        .error(angular.bind(this, function(data) {
            console.log('Error: ' + data);
        }));
    };
    
    this.deleteProject = function(id) {
        var toDelete = confirm('Do you want to delete project?');
        if (toDelete) {
            $http.delete('/client/' + id)
            .success(angular.bind(this, function(data) {
                this.projects = data;
            }))
            .error(angular.bind(this, function(data) {
                console.log('Error: ' + data);
            }));
        }
    };
});