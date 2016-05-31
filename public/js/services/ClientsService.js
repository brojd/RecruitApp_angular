recruitApp.service('ClientsService', function($http) {
    
    this.getClients = function() {
        return $http.get('/clients');
    };
    
    this.addClient = function(client) {
        return $http.post('/clients', client);
    };
    
    this.removeClient = function(idOfClient) {
        return $http.delete('/clients/' + idOfClient);
    }
    
});