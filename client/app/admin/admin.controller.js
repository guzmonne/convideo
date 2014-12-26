'use strict';

angular.module('convideoApp')
  .controller('AdminCtrl', function ($state, $location, Auth) {
	this.current = $location.url;
	this.isAdmin = Auth.isAdmin;
	$state.go('admin.videos');
  });
