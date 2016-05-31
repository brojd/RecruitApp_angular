recruitApp.controller('clientsCtrl', function($http, $window, ClientsService) {
    
    $window.console = updateConsole($window.console);
    
    this.formData = {};

    ClientsService.getClients().then(angular.bind(this, function(serverResponse) {
        this.clients = serverResponse.data;
    }));
    
    this.createClient = function() {
        ClientsService.addClient(this.formData).then(angular.bind(this, function(serverResponse) {
            this.formData = {};
            this.clients = serverResponse.data;
        }));
    };
    
    this.deleteClient = function(id) {
        var toDelete = confirm('Do you want to delete client?');
        if (toDelete) {
            ClientsService.removeClient(id).then(angular.bind(this, function(serverResponse) {
                this.clients = serverResponse.data;
            }));
        };
    };
    
});