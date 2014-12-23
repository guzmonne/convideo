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
          return self.collection.fetch().then(
            function(data){
              var object;
              // Success
              if (data){
                object = {
                  title   : 'Exito!',
                  type    : 'success',
                  message : 'Los videos se han actualizado con exito'
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
        self.activate         = function(id){
          self.active  = self.collection.find(id);
          self.editTab = true;
        };
        self.tableData = videosTableValue;
        self.actions = function(object){
          var msg, id = object,
              model = self.collection.find(id);
          model.set('enabled', !model.get('enabled'));
          msg = (model.get('enabled')) ? 'Habilitado' : 'Deshabilitado';
          model.save().then(function(){
            toaster.add({
              title: 'Video ' + msg,
              type: 'success'
            });
          });
        };
      }],
      controllerAs: 'videos',
    };
  });
