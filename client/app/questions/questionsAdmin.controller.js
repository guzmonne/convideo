'use strict';

angular.module('convideoApp')
  .controller('QuestionsAdminCtrl', function (questions) {
    this.collection = questions;
  });
