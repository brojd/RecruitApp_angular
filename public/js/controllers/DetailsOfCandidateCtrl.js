recruitApp.controller('detailsOfCandidateCtrl', function($http, $routeParams, $window) {
    
    $window.console = updateConsole($window.console);
    
    this.candidateID = $routeParams.candidateID;
    this.details = {};
    this.goBack = function() {
        $window.history.back();
    };
    
    $http({
        method: 'GET',
        url: '/detailsOfCandidate',
        params: {'candidateID': this.candidateID}
    })
    .success(angular.bind(this, function(data) {
        this.details = data[0].details;
        this.nameOfCandidate = data[0].name;
        this.surnameOfCandidate = data[0].surname;
    }));
    
    this.saveDetails = function() {
        $http.post('/detailsOfCandidate', {'details': this.details,
                                           'candidateID': this.candidateID})
        .success(angular.bind(this, function(data) {
            this.details = data[0].details;
        }))
        .error(angular.bind(this, function(data) {
            console.log('Error ' + data);
        }));
    };
    
    this.addForm = function(section) {
        var detailsSection = this.details[section.nameOfSection.toLowerCase()];
        detailsSection.nbOfForms.push(section.nbOfForms.length + 1);
        detailsSection['fields' + Number(section.nbOfForms.length)] = detailsSection.fields;
        console.log(this.details);
    };
});