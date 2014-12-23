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
      	self.fetch = function(){ 
          return self.collection.fetch().then(
            function(data){
              var object;
              // Success
              if (data){
                object = {
                  title   : 'Exito!',
                  type    : 'success',
                  message : 'Las preguntas se han actualizado con exito'
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
      	self.activate = function(id){
          self.active  = self.collection.find(id);
          self.editTab = true;
      	};
        self.tableData = questionsTableValue;
        self.actions = function(object){
          var msg, id = object,
              model = self.collection.find(id);
          model.set('enabled', !model.get('enabled'));
          msg = (model.get('enabled')) ? 'Habilitada' : 'Deshabilitada';
          model.save().then(function(){
            toaster.add({
              title: 'Pregunta ' + msg,
              type: 'success'
            });
          });
        };
      }],
      controllerAs: 'questions'
    };
  });