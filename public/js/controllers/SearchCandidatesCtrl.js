recruitApp.controller('searchCandidatesCtrl', function($http, $routeParams, $window, CandidatesService) {
    
    $window.console = updateConsole($window.console);
    
    this.goBack = function() {
        $window.history.back();
    };
    
    CandidatesService.getAllCandidates().then(angular.bind(this, function(serverResponse) {
        this.allCandidates = serverResponse.data;
    }));
    
});