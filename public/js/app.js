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

    this.logIn = function() {
      $http({
          method: 'POST',
          url: '/sessions',
          data: {
              username: this.loggedUser,
              password: this.loggedUserPassword
          }
      }).then((response) => {
        console.log(response);
        this.loggedUser = response.data.username

      }, (error) => {
          console.log(error);
      });
    }

}]);
