'use strict';

angular.module('convideoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('videos', {
        url: '/videos/:_category',
        templateUrl: 'app/videos/videos.html',
        controller: 'VideosCtrl as videos',
        resolve: {
          questions: ['$stateParams', 'VideosCollection', 'QuestionsCollection', function($stateParams, VideosCollection, QuestionsCollection){
            return (new QuestionsCollection()).fetch({_category: $stateParams._category});
          }],
          videos: ['$stateParams', 'VideosCollection', function($stateParams, VideosCollection){
            return (new VideosCollection().fetch({_category: $stateParams._category}));
          }],
        },
      });
  });