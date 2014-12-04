'use strict';

angular.module('convideoApp')
  .directive('categories', function () {
    return {
      templateUrl: 'app/categories/categories.html',
      restrict: 'E',
      scope: {
        categories: '=',
      },
      controller: ['$scope', 'categoriesTableValue', function($scope, categoriesTableValue){
      	var self = this;
        self.collection = $scope.categories;
        self.fetch = function(){ return self.collection.fetch(); };
        self.tableData = categoriesTableValue;
      }],
      controllerAs: 'categoriesCtrl',
    };
  });