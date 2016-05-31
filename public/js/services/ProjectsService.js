recruitApp.service('ProjectsService', function($http) {
    
    this.getProjects = function(clientID) {
        return $http({
            method: 'GET',
            url: '/client',
            params: {'clientID': clientID}
        });
    };
    
    this.addProject = function(clientID, formData) {
        return $http.post('/client', {'formData': formData,
                                      'clientID': clientID});
    };
    
    this.removeProject = function(idOfProject) {
        return $http.delete('/client/' + idOfProject);
    };
    
    this.getProjectDetails = function(clientID, projectID) {
        return $http({
            method: 'GET',
            url: '/detailsOfProject',
            params: {'clientID': clientID,
                     'projectID': projectID}
        });
    };
    
    this.saveDescription = function(projectID, jobDescText) {
        return $http({
            method: 'PUT',
            url: '/detailsOfProject',
            params: {'projectID': projectID,
                     'jobDescText': jobDescText}
        });
    };
    
});