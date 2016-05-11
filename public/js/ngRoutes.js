recruitApp.config(function($routeProvider) {
    
    $routeProvider.
    
        when('/', {
            templateUrl: '../views/clients.html',
            controller: 'clientsCtrl'
        }).
        
        when('/client/:clientID', {
            templateUrl: '../views/projects.html',
            controller: 'projectsCtrl'
        });
        
});