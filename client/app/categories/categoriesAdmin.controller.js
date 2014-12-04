'use strict';

angular.module('convideoApp')
  .controller('CategoriesAdminCtrl', function (categories) {
    this.collection = categories;
  });
