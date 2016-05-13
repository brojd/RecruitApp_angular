recruitApp.config(function($routeProvider) {
    
    $routeProvider.
    
        when('/', {
            templateUrl: '../views/clients.html',
            controller: 'clientsCtrl',
            css: ['../css/main.css', '../css/clients&projects.css', '../css/clients&projectsMediaQueries.css']
        }).
        
        when('/client/:clientID', {
            templateUrl: '../views/projects.html',
            controller: 'projectsCtrl',
            css: ['../css/main.css', '../css/clients&projects.css', '../css/clients&projectsMediaQueries.css']
        }).
        
        when('/client/:clientID/project/:projectID', {
            templateUrl: '../views/detailsOfProject.html',
            controller: 'candidatesCtrl',
            css: ['../css/main.css', '../css/detailsOfProject.css', '../css/detailsOfProjectMediaQueries']
        });
        
});