const app = angular.module('MyApp', []);

app.controller('MainController', ['$http', function($http) {
    this.boardClicked = false;
    this.indexOfCreateTaskForm = null;

    this.indexOfMoveTaskForm = null;

    this.movableLists = [];

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
        this.getBoards(this.loggedInUser._id);
      }, (error) => {
          console.log(error);
      });
    };

    this.logOut = function(){
      $http({
        method: 'DELETE',
        url: '/sessions'
      }).then(response=>{
        this.loggedInUser = null;
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
          this.getBoards(this.loggedInUser._id);
        }).catch((error)=>{
          console.log(error);
        });
    }

    this.getBoards = function(id) {
      $http({
        method: 'GET',
        url: '/boards/' + id
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
        url: '/boards/board/' + id
      }).then(response=>{
        // console.log(response);
        this.currentBoard = response.data;
        this.getLists(id);
        this.getTasks(id);
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
                belongsToBoard: this.currentBoard._id
            }
        }).then((response)=>{
          // console.log(response.data);
          // console.log(this.currentBoard);
          this.movableLists.push({
              title: response.data.list.listTitle,
              id: response.data.list._id
          });
          console.log(this.movableLists);
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

    this.createTask = function(listID){
      $http({
        method: 'POST',
        url: '/tasks',
        data: {
          taskDescription: this.taskDescription,
          belongsToList: listID,
          belongsToBoard: this.currentBoard
        }
      }).then(response => {
        console.log(response);
        this.getTasks();
        this.indexOfCreateTaskForm = null;
      }).catch(error => {
        console.log(error);
      })
    }

    this.getTasks = function(){
      $http({
        method: 'GET',
        url: '/tasks/' + this.currentBoard._id
      }).then(response => {
        console.log(response);
        this.tasks = response.data;
      }).catch(error => {
        console.log(error);
      })
    }

}]);
