'use strict';

angular.module('convideoApp')
  .directive('settings', function () {
    return {
      templateUrl: 'app/account/settings/settings.html',
      restrict: 'E',
      controller: ['$scope', 'User', 'Auth', function ($scope, User, Auth) {
		    $scope.errors = {};
		    $scope.changePassword = function(form) {
		      $scope.submitted = true;
		      if(form.$valid) {
		        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
		        .then( function() {
		          $scope.message = 'Su contraseña se ha actualizado con exito.';
		        })
		        .catch( function() {
		          form.password.$setValidity('mongoose', false);
		          $scope.errors.other = 'Contraseña Incorrecto';
		          $scope.message = '';
		        });
		      }
				};
		  }],
    };
  });