recruitApp.controller('searchCandidatesCtrl', function($http, $routeParams, $window) {
    
    $window.console = updateConsole($window.console);
    
    this.goBack = function() {
        $window.history.back();
    };
    
    $http({
        method: 'GET',
        url: '/searchCandidates',
    })
    .success(angular.bind(this, function(allCandidates) {
        this.allCandidates = allCandidates;
        console.log(this.allCandidates);
    }))
    .error(angular.bind(this, function(allCandidates) {
        console.log('Error ' + allCandidates);
    }));
    
});