

/* CLIENTS */


recruitApp.controller('clientsCtrl', function($scope, $http) {
    
    $scope.formData = {};
    
    $http.get('/clients')
        .success(function(data) {
            $scope.clients = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    $scope.createClient = function() {
        $http.post('/clients', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.clients = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    
    $scope.deleteClient = function(id) {
        $http.delete('/clients/' + id)
            .success(function(data) {
                $scope.clients = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
});