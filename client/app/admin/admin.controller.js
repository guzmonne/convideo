'use strict';

angular.module('convideoApp')
  .controller('AdminCtrl', function ($location) {
		this.current = $location.url;
  });
