'use strict';

angular.module('convideoApp')
  .service('QuestionsTable', function(questionsTableValue){
    return function(categories){
      var object = _.cloneDeep(questionsTableValue);
      object.options.categoryIDtoName = categories.names();
      return object;
    }
  });