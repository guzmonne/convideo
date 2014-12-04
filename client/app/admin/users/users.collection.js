'use strict';

angular.module('convideoApp')
  .factory('UsersCollection', function (Collection, UsersModel) {
    var UsersCollection = Collection.extend({
      model: UsersModel,
    });
    return UsersCollection;
  });