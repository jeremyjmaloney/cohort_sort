const app = angular.module('MyApp', []);

app.controller('MainController', ['$http', function($http) {
    this.boardClicked = false;
    this.indexOfCreateTaskForm = null;
    this.indexOfMoveTaskForm = null;
    this.taskBeingEdited = null;
    this.currentList = null;
    this.addingUser = false;
    this.editingTask = false;
    this.indexOfEditTaskForm = null;
    this.editingBoardName = false;
    this.indexOfEditListForm = null;

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
        // console.log(response.data.user);
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
        this.boardClicked = false;
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
          // console.log(response);
          this.getBoards(this.loggedInUser._id);
          this.title = null;
        }).catch((error)=>{
          console.log(error);
        });
    }

    this.getBoards = function(id) {
      $http({
        method: 'GET',
        url: '/boards/' + id
      }).then((response)=>{
        // console.log(response);
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
           this.getLists(this.currentBoard._id);
           this.listTitle = null;
        }).catch((error)=>{
          console.log(error);
        });
    }

    this.getLists = (id) => {
        console.log(this.currentList);
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
        this.taskDescription = null;
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

    this.moveTask = function() {
        console.log(this.taskBeingEdited);
        console.log(this.currentList);
        $http({
            method: 'PUT',
            url: '/tasks/' + this.taskBeingEdited + '/' + this.currentList
        }).then(response => {
          console.log(response);
          this.getTasks();
          this.taskBeingEdited = null;
        }).catch(error => {
          console.log(error);
      });
    }

    this.deleteTask = function(taskID) {
      $http({
        method: 'DELETE',
        url: '/tasks/' + taskID
      }).then(response => {
        console.log(response);
        this.getTasks();
      }).catch(error => {
        console.log(error);
      });
    }

    this.deleteList = function(listID) {
      $http({
        method: 'DELETE',
        url: '/lists/' + listID
      }).then(response => {
        console.log(response);
        this.getLists(this.currentBoard._id);
      }).catch(error => {
        console.log(error);
      })
    }

    this.addUser = function() {
      $http({
        method: 'PUT',
        url: '/boards/' + this.currentBoard._id + '/' + this.searchedUser
      }).then(response=>{
        console.log(response);
        this.addingUser = false;
      }).catch(error=>{
        console.log(error);
        this.addingUser = false;
      });
    }

    this.editTask = function(task) {
        console.log(this.indexOfEditTaskForm);
        $http({
            method: 'PUT',
            url: '/tasks/' + task._id,
            data: {
                taskDescription: this.updatedDescription
            }
        }).then(response => {
          console.log(response);
          this.updatedDescription = null;
          this.editingTask = false;
          this.indexOfEditTaskForm = null;
          this.currentList = null;
          this.getTasks();
        }).catch(error => {
          console.log(error);
      });
    }

    this.compareIds = function(id, list) {
        console.log(id, list);
        if (id === list) {
            return true;
        } else {
            return false;
        }
    }

    this.editBoardName = function(board) {
        $http({
            method: 'PUT',
            url: '/boards/' + board._id,
            data: {
                title: this.updatedBoardName
            }
        }).then(response => {
          console.log(response);
          this.updatedBoardName = null;
          this.editingBoardName = false;
          this.showBoard(this.currentBoard._id);
        }).catch(error => {
          console.log(error);
      });
    }

    this.goToBoards = function() {
        this.boardClicked = false;
        this.getBoards(this.loggedInUser._id);
        this.editingBoardName = false;
    }

    this.editListName = function(list) {
        $http({
            method: 'PUT',
            url: '/lists/' + list._id,
            data: {
                listTitle: this.updatedListName
            }
        }).then(response => {
          console.log(response);
          this.updatedListName = null;
          this.indexOfEditListForm = null;
          this.getLists(this.currentBoard._id);
        }).catch(error => {
          console.log(error);
      });
    }

}]);
