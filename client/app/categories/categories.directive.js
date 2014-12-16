'use strict';

angular.module('convideoApp')
  .directive('categories', function () {
    return {
      templateUrl: 'app/categories/categories.html',
      restrict: 'E',
      scope: {
        categories: '=',
      },
      controller: ['$scope', 'categoriesTableValue', 'toaster', function($scope, categoriesTableValue, toaster){
      	var self = this;
        self.collection = $scope.categories;
        self.actions = function(object){
          var id = object,
              model = self.collection.find(id);
          model.set('enabled', !model.get('enabled'));
          model.save().then(function(){
            toaster.add({
              title: 'Categoria Habilitada',
              type: 'success'
            });
          });
        };
        self.fetch = function(){ 
          return self.collection.fetch().then(
            function(data){
              var object;
              // Success
              if (data){
                object = {
                  title   : 'Exito!',
                  type    : 'success',
                  message : 'Las categorías se han actualizado con exito'
                };
              // Error
              } else {
                object = {
                  title: 'Error!',
                  message: 'Ha ocurrido un error al actualizar.',
                  type: 'danger'
                };
              }
              toaster.add(object);
            }
          );
        };
        self.tableData = categoriesTableValue;
      }],
      controllerAs: 'categories',
    };
  });