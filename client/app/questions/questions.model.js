'use strict';

angular.module('convideoApp')
  .factory('QuestionsModel', function (Model) {
    var QuestionsModel = Model.extend({
      endpoint: 'Question',
    });
    return QuestionsModel;
  });
