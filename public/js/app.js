const app = angular.module('MyApp', []);

app.controller('AuthController', ['$http', function($http) {
    const controller = this;

    this.createUser = function() {
        $http({
            method: 'POST',
            url: '/users',
            data: {
                username: this.username,
                password: this.password
            }
        }).then((response) => {
            this.username = null;
            this.password = null;
            console.log(response.config.data.username, response.config.data.password);
        }, (error) => {
            console.log(error);
        });
    }
}]);
