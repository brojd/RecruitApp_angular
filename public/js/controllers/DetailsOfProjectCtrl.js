recruitApp.controller('detailsOfProjectCtrl', function($http, $routeParams, $window, ProjectsService, CandidatesService) {
    
    $window.console = updateConsole($window.console);
    
    this.clientID = $routeParams.clientID;
    this.projectID = $routeParams.projectID;
    this.formData = {};
    this.goBack = function() {
        $window.history.back();
    };
    
    ProjectsService.getProjectDetails(this.clientID, this.projectID)
                           .then(angular.bind(this, function(serverResponse) {
        this.clientName = serverResponse.data.client[0].name;
        this.projectName = serverResponse.data.project[0].name;
        this.jobDescText = serverResponse.data.project[0].job_description;
        this.candidates = serverResponse.data.candidates;
    }));
    
    this.createCandidate = function() {
        CandidatesService.addCandidate(this.formData, this.projectID)
                               .then(angular.bind(this, function(serverResponse) {
            this.candidates = serverResponse.data;
            this.formData = {};
        }));
    };
    
    this.deleteCandidate = function(id) {
        var toDelete = confirm('Do you want to delete project?');
        if (toDelete) {
            CandidatesService.removeCandidate(id).then(angular.bind(this, function(serverResponse) {
                this.candidates = serverResponse.data;
            }));
        }
    };
    
    this.saveJobDesc = function() {
        ProjectsService.saveDescription(this.projectID, this.jobDescText)
                               .then(angular.bind(this, function(serverResponse) {
                                   console.log(serverResponse.data);
                               }));
    };
    
});