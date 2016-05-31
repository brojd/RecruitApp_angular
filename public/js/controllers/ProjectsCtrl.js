recruitApp.controller('projectsCtrl', function($http, $routeParams, $window, ProjectsService) {
    
    $window.console = updateConsole($window.console);

    this.clientID = $routeParams.clientID;
    this.formData = {};
    this.goBack = function() {
        $window.history.back();
    };
    
    ProjectsService.getProjects(this.clientID).then(angular.bind(this, function(serverResponse) {
        this.projects = serverResponse.data.projects;
        this.clientName = serverResponse.data.client[0].name;
    }));
    
    this.createProject = function() {
        ProjectsService.addProject(this.clientID, this.formData).then(angular.bind(this, function(serverResponse) {
            this.projects = serverResponse.data;
            this.formData = {};
        }));
    };
    
    this.deleteProject = function(id) {
        var toDelete = confirm('Do you want to delete project?');
        if (toDelete) {
            ProjectsService.removeProject(id).then(angular.bind(this, function(serverResponse) {
                this.projects = serverResponse.data;
            }));
        };
    };
    
});