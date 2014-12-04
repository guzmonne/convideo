'use strict';

angular.module('convideoApp')
  .factory('QuestionsCollection', function (Collection, QuestionsModel, Api) {
    var QuestionsCollection = Collection.extend({
      model: QuestionsModel,
      fetchByCategory: function(_category){
      	var collection = this;
      	return Api.Question.index({_category: _category}, function(resp){
      		collection.add(resp);
      	}).$promise;
      },
    });
    return QuestionsCollection;
  });
