'use strict';

angular.module('convideoApp')
  .directive('newQuestion', function () {
    return {
      templateUrl: 'app/questions/newQuestionForm/newQuestionForm.html',
      restrict: 'E',
      scope: {
      	_category: '@category',
        editModel: '=',
      },
      controller: ['$scope', 'QuestionsModel', 'toaster', function($scope, QuestionsModel, toaster){
      	var self = this;
      	self.model = new QuestionsModel({_category: $scope._category});
				self.submit = function(){
					self.isSaving = true;
      		self.model.save().then(function(){
      			self.isSaving = false;
            if (self.model.isNew()){
              toaster.add({
                type   :'success',
                title  : "Exito!",
                message: "Pregunta creada con exito."
              });
            } else {
              toaster.add({
                type   :'success',
                title  : "Exito!",
                message: "Pregunta actualizada con exito."
              });
            }
          });
          if (self.model.isNew()) { self.model = new QuestionsModel({_category: $scope.category}); }
      	};
      }],
      controllerAs: 'newQuestion',
      link: function(scope){
        scope.$watch('editModel', function(n){
          if (n === null || n === undefined){ return; }
          scope.newQuestion.model = n;
        });
      }
    };
  });