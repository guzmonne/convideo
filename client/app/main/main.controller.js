'use strict';

angular.module('convideoApp')
  .controller('MainCtrl', function ($scope, $http, Auth, collection) { 
    $scope.collection = collection;
    $scope.isAdmin    = Auth.isAdmin;
    $scope.logout     = Auth.logout;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.openVideo  = function(id){ console.log(id);  }
  });
