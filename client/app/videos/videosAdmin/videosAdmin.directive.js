'use strict';

angular.module('convideoApp')
  .directive('videosAdmin', function () {
    return {
      templateUrl: 'app/videos/videosAdmin/videosAdmin.html',
      restrict: 'E',
      scope: {
        videos    : '=',
        categories: '=',
      },
      controller: ['$scope', '$rootScope', 'toaster', 'videosTableValue', function($scope, $rootScope, toaster, videosTableValue){
        var self              = this;
        self.collection       = $scope.videos;
        self.active           = null;
        self.fetch            = function(){
          return self.collection.fetch(); 
        };
        self.activate         = function(id){
          self.active  = self.collection.find(id);
          self.editTab = true;
        };
        self.tableData = videosTableValue;
      }],
      controllerAs: 'videos',
    };
  });
