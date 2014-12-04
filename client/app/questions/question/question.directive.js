'use strict';

angular.module('convideoApp')
  .directive('question', function () {
    return {
      templateUrl: 'app/questions/question/question.html',
      restrict: 'E',
      scope: {
      	model: '=',
      },
      controller: ['$scope', function($scope){
      	this.model = $scope.model;
      }],
      controllerAs: 'question',
    };
  });