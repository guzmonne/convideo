'use strict';

angular.module('convideoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
	resolve: {
		collection: [
			'VideosCollection',
			function(VideosCollection){
				return (new VideosCollection()).fetch({enabled:true, limitTo: 3});
			}
		],
	},
      });
  });
