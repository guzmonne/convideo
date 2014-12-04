'use strict';

angular.module('convideoApp')
  .factory('UsersModel', function (Model) {
    var UsersModel = Model.extend({
      endpoint: 'User',
      defaults: {}
    });
    return UsersModel;
  });