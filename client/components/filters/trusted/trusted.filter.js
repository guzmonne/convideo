'use strict';

angular.module('convideoApp')
  .filter('trusted', function ($sce) {
    return function (url) {
      return $sce.trustAsResourceUrl(url);
    };
  });
