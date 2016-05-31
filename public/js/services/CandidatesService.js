recruitApp.service('CandidatesService', function($http) {
    
    this.addCandidate = function(formData, projectID) {
        return $http.post('/detailsOfProject', {'formData': formData,
                                                'projectID': projectID});
    };
    
    this.removeCandidate = function(idOfCandidate) {
        return $http.delete('/detailsOfProject/' + idOfCandidate);
    };
    
    this.getCandidateDetails = function(candidateID) {
        return $http({
            method: 'GET',
            url: '/detailsOfCandidate',
            params: {'candidateID': candidateID}
        });
    };
    
    this.saveCandidateDetails = function(details, candidateID) {
        return $http.post('/detailsOfCandidate', {'details': details,
                                                  'candidateID': candidateID});
    };
    
    this.addNewForm = function(section, details) {
        var detailsSection = details[section.nameOfSection.toLowerCase()];
        detailsSection.nbOfForms.push(section.nbOfForms.length + 1);
        console.log(detailsSection.fields);
        detailsSection['fields' + Number(section.nbOfForms.length)] = detailsSection.fields;
    };
    
    this.getAllCandidates = function() {
        return $http({
            method: 'GET',
            url: '/searchCandidates',
        });
    };
      
});