'use strict';

angular.module('convideoApp')
  .directive('questionsAdmin', function () {
    return {
      templateUrl: 'app/questions/questionsAdmin/questionsAdmin.html',
      restrict: 'E',
      scope: {
        questions : '=',
      },
      controller: ['$scope', 'toaster', 'questionsTableValue', function($scope, toaster, questionsTableValue){
      	var self = this;
        self.collection = $scope.questions;
      	self.active = null;
      	self.fetch = function(){ return self.collection.fetch(); };
      	self.activate = function(id){
          self.active  = self.collection.find(id);
          self.editTab = true;
      	};
        self.tableData = questionsTableValue;
      }],
      controllerAs: 'questions'
    };
  });