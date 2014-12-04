'use strict';

angular.module('convideoApp')
  .directive('users', function () {
    return {
			templateUrl: 'app/admin/users/users.html',
			restrict   : 'E',
			controller : ['$scope', '$http', 'Auth', 'User', 'UsersModel', 'UsersCollection', 'toaster', function($scope, $http, Auth, User, UsersModel, UsersCollection, toaster){
				var self    = this;
  	    (this.collection = new UsersCollection()).fetch();
				this.active = new User();
				this.delete = function(user) {
				  User.remove({ id: user._id });
				  this.collection.remove(user);
          toaster.add({
            type   : 'success',
            title  : 'Exito!',
            message: 'Usuario eliminado con exito!'
          });
				};
				this.isAdmin = Auth.isAdmin;
				this.save = function(){
					var msg;
					this.active.save().then(function(){
						if (self.newUser){
              msg = 'Usuario creado con exito.';
              self.collection.push(self.active);
              self.active = new UsersModel();
            } else {
            	msg = 'Usuario actualizado con exito.';
            }
            toaster.add({
              type   : 'success',
              title  : 'Exito!',
              message: msg
            });
					});
				};
				this.edit = function(user){
					this.active   = user;
					this.showForm = true;
					this.newUser  = false;
				};
				this.new = function(){
					this.active   = new UsersModel();
					this.showForm = true;
					this.newUser  = true;
				};
				this.cancel = function(e){ 
					if (e) { e.preventDefault(); }
					this.showForm = false; 
				};
      }],
      controllerAs: 'users',
    };
  });