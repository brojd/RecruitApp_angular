recruitApp.config(function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '../views/clients.html',
            controller: 'clientsCtrl'
        });
});