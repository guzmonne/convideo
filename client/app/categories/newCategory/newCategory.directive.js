'use strict';

angular.module('convideoApp')
  .directive('newCategory', function () {
    return {
      templateUrl: 'app/categories/newCategory/newCategory.html',
      restrict: 'E',
      controller: ['CategoriesModel', function(CategoriesModel){
      	this.model = new CategoriesModel();
      	this.submit = function(){
          this.model.save();
          this.model = new CategoriesModel();
      	};
      }],
      controllerAs: 'newCategory',
    };
  });