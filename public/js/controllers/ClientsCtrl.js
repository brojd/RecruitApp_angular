recruitApp.controller('clientsCtrl', function($http) {
    
    this.formData = {};
    
    $http.get('/clients')
        .success(angular.bind(this, function(data) {
            this.clients = data;
        }))
        .error(angular.bind(this, function(data) {
            console.log('Error: ' + data);
        }));
    
    this.createClient = function() {
        $http.post('/clients', this.formData)
            .success(angular.bind(this, function(data) {
                this.formData = {};
                this.clients = data;
            }))
            .error(angular.bind(this, function(data) {
                console.log('Error: ' + data);
            }));
    };
    
    this.deleteClient = function(id) {
        var toDelete = confirm('Do you want to delete client?');
        if (toDelete) {
            $http.delete('/clients/' + id)
            .success(angular.bind(this, function(data) {
                this.clients = data;
            }))
            .error(angular.bind(this, function(data) {
                console.log('Error: ' + data);
            }));
        }
    };
});