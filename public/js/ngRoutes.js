recruitApp.config(function($routeProvider) {
    
    $routeProvider.
    
        when('/', {
            templateUrl: '../views/clients.html',
            controller: 'clientsCtrl as clients',
            css: ['../css/main.css', '../css/clients&projects.css', '../css/clients&projectsMediaQueries.css']
        }).
        
        when('/client/:clientID', {
            templateUrl: '../views/projects.html',
            controller: 'projectsCtrl as projects',
            css: ['../css/main.css', '../css/clients&projects.css', '../css/clients&projectsMediaQueries.css']
        }).
        
        when('/client/:clientID/detailsOfProject/:projectID', {
            templateUrl: '../views/detailsOfProject.html',
            controller: 'detailsOfProjectCtrl as detailsOfProject',
            css: ['../css/main.css', '../css/detailsOfProject.css', '../css/detailsOfProjectMediaQueries.css']
        }).
        
        when('/detailsOfCandidate/:candidateID', {
            templateUrl: '../views/detailsOfCandidate.html',
            controller: 'detailsOfCandidateCtrl as detailsOfCandidate',
            css: ['../css/main.css', '../css/detailsOfCandidate.css', '../css/detailsOfCandidateMediaQueries.css']
        }).
        
        when('/searchCandidates', {
            templateUrl: '../views/searchCandidates.html',
            controller: 'searchCandidatesCtrl as searchCandidates',
            css: ['../css/main.css', '../css/searchCandidates.css', '../css/searchCandidatesMediaQueries.css']
        });
        
});