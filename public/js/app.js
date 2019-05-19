const app = angular.module('MyApp', []);

app.controller('MainController', ['$http', function($http) {
    this.boardClicked = false;

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
    };

    this.logIn = function() {
      $http({
          method: 'POST',
          url: '/sessions',
          data: {
              username: this.username,
              password: this.password
          }
      }).then((response) => {
        console.log(response.data.user);
        this.loggedInUser = response.data.user;
        this.username = null;
        this.password = null;
        this.getBoards();
      }, (error) => {
          console.log(error);
      });
    };

    this.logOut = function(){
      $http({
        method: 'DELETE',
        url: '/sessions'
      }).then(response=>{
        this.loggedInUsername = null;
      }).catch(error=>{
        console.log(error);
      });
    };

    this.createBoard = () => {
        $http({
            method: 'POST',
            url: '/boards',
            data: {
                title: this.title,
                belongsTo: this.loggedInUser._id
            }
        }).then((response)=>{
          console.log(response);
          this.getBoards();
        }).catch((error)=>{
          console.log(error);
        });
    }

    this.getBoards = function() {
      $http({
        method: 'GET',
        url: '/boards'
      }).then((response)=>{
        console.log(response);
        this.boards = response.data.boards;
      }).catch((error)=>{
        console.log(error);
      });
    };

    this.showBoard = function(id){
      this.boardClicked = true;
      $http({
        method: 'GET',
        url: '/boards/' + id
      }).then(response=>{
        console.log(response);
        this.currentBoard = response.data;
        this.getLists(this.currentBoard._id);
      }).catch(error=>{
        console.log(error);
      });
    };

    this.createList = () => {
        $http({
            method: 'POST',
            url: '/lists',
            data: {
                listTitle: this.listTitle,
                belongsTo: this.currentBoard._id
            }
        }).then((response)=>{
          console.log(response);
          console.log(this.currentBoard);
           this.getLists(this.currentBoard._id);
        }).catch((error)=>{
          console.log(error);
        });
    }

    this.getLists = (id) => {
        $http({
            method: 'GET',
            url: '/lists/' + id
        }).then((response) => {
            console.log(response);
            this.lists = response.data;
        }).catch((error) => {
            console.log(error);
        });
    }

}]);
