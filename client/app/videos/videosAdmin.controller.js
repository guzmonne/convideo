'use strict';

angular.module('convideoApp')
  .controller('VideosAdminCtrl', function (videos, categories) {
    this.collection = videos;
    this.categories = categories;
  });
