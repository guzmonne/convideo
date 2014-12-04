'use strict';

angular.module('convideoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        state: 'abstract',
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl as admin',
      })
      .state('admin.videos', {
        url: '/videos',
        template: '<videos-admin videos="videos.collection" categories="videos.categories"></videos-admin>',
        controller: 'VideosAdminCtrl as videos',
        resolve: {
          videos: ['VideosCollection', function(VideosCollection){
            return (new VideosCollection()).fetch();
          }],
          categories: ['CategoriesCollection', function(CategoriesCollection){
            return (new CategoriesCollection()).fetch();
          }],
        },
      })
      .state('admin.questions', {
        url: '/questions',
        template: '<questions-admin questions="questions.collection""></questions-admin>',
        controller: 'QuestionsAdminCtrl as questions',
        resolve: {
          questions: ['QuestionsCollection', function(QuestionsCollection){
            return (new QuestionsCollection()).fetch();
          }],
        },
      })
      .state('admin.categories', {
        url: '/categories',
        template: '<categories categories="categories.collection"></categories>',
        controller: 'CategoriesAdminCtrl as categories',
        resolve: {
          categories: ['CategoriesCollection', function(CategoriesCollection){
            return (new CategoriesCollection()).fetch();
          }],
        }
      })
      .state('admin.users', {
        url: '/users',
        template: '<users></users>',
      })
      .state('admin.settings', {
        url: '/settings',
        template: '<settings></settings>'
      });
  });