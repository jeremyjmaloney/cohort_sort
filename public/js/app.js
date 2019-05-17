const app = angular.module('MyApp', []);

app.controller('AuthController', ['$http', function($http) {
    const controller = this;

    this.createUser = function() {
        $http({
            method: 'POST',
            url: '/users',
            data: {
                username: this.newUsername,
                password: this.newPassword
            }
        }).then((response) => {
          console.log(response.config.data.username, response.config.data.password);
            this.newUsername = null;
            this.newPassword = null;
        }, (error) => {
            console.log(error);
        });
    }

    this.logIn = function() {
      $http({
          method: 'POST',
          url: '/sessions',
          data: {
              username: this.username,
              password: this.password
          }
      }).then((response) => {
        console.log(response);

      }, (error) => {
          console.log(error);
      });
    }

}]);
