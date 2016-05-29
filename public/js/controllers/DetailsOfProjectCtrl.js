recruitApp.controller('detailsOfProjectCtrl', function($http, $routeParams, $window) {
    
    $window.console = updateConsole($window.console);
    
    this.clientID = $routeParams.clientID;
    this.projectID = $routeParams.projectID;
    this.formData = {};
    this.goBack = function() {
        $window.history.back();
    };
    
    $http({
        method: 'GET',
        url: '/detailsOfProject',
        params: {'clientID': this.clientID,
                 'projectID': this.projectID}
    })
    .success(angular.bind(this, function(data) {
        this.clientName = data.client[0].name;
        this.projectName = data.project[0].name;
        this.jobDescText = data.project[0].job_description;
        this.candidates = data.candidates;
    }))
    .error(angular.bind(this, function(data) {
        console.log('Error: ' + data);
    }));
    
    this.createCandidate = function() {
        $http.post('/detailsOfProject', {'formData': this.formData,
                                         'projectID': this.projectID})
        .success(angular.bind(this, function(data) {
            this.candidates = data;
            this.formData = {};
        }))
        .error(angular.bind(this, function(data) {
            console.log('Error ' + data);
        }));
    };
    
    this.deleteCandidate = function(idOfCandidate) {
        var toDelete = confirm('Do you want to delete candidate?');
        if (toDelete) {
            $http.delete('/detailsOfProject/' + idOfCandidate)
            .success(angular.bind(this, function(data) {
                this.candidates = data;
            }));
        }
    };
    
    this.saveJobDesc = function() {
        $http({
            method: 'PUT',
            url: '/detailsOfProject',
            params: {'projectID': this.projectID,
                     'jobDescText': this.jobDescText}
        })
        .success(angular.bind(this, function(data) {
            console.log(data);
        }))
        .error(angular.bind(this, function(data) {
            console.log('Error ' + data)
        }));
    };
});