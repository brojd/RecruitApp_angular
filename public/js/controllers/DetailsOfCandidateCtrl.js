recruitApp.controller('detailsOfCandidateCtrl', function($http, $routeParams, $window, CandidatesService) {
    
    $window.console = updateConsole($window.console);
    
    this.candidateID = $routeParams.candidateID;
    this.details = {};
    this.goBack = function() {
        $window.history.back();
    };
    
    CandidatesService.getCandidateDetails(this.candidateID)
                             .then(angular.bind(this, function(serverResponse) {
        this.details = serverResponse.data[0].details;
        this.nameOfCandidate = serverResponse.data[0].name;
        this.surnameOfCandidate = serverResponse.data[0].surname;
    }));
    
    this.saveDetails = function() {
        CandidatesService.saveCandidateDetails(this.details, this.candidateID)
                                 .then(angular.bind(this, function(serverResponse) {
            this.details = serverResponse.data[0].details;
        }));
    };
    
    this.addForm = function(section) {
        CandidatesService.addNewForm(section, this.details);
        this.saveDetails();
    };
    
    this.getSectionFields = function(detailSection, nbOfField) {
        if (nbOfField >= 2) {
            return detailSection['fields' + nbOfField];
        } else {
            return detailSection['fields'];
        }
    };
    
});