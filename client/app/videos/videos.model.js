'use strict';

angular.module('convideoApp')
  .factory('VideosModel', function (Model) {
    var VideosModel = Model.extend({
      endpoint: 'Video',
    });
    return VideosModel;
  });
