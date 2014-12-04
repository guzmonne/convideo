'use strict';

angular.module('convideoApp')
  .factory('Api', ['$resource', function($resource){
    var restRoutes =       {
      'create':  { method: 'POST' },
      'index':   { method: 'GET', isArray: true },
      'show':    { method: 'GET', isArray: false },
      'update':  { method: 'PUT' },
      'patch':   { method: 'PATCH' },
      'destroy': { method: 'DELETE' }
    };
    return {
      'Video'         : $resource('/api/videos/:id'           ,{id: '@_id'}, restRoutes),
      'Device'        : $resource('/api/categories/:id'       ,{id: '@_id'}, restRoutes),
      'Thing'         : $resource('/api/things/:id'           ,{id: '@_id'}, restRoutes),
      'Category'      : $resource('/api/categories/:id'       ,{id: '@_id'}, restRoutes),
      'Question'      : $resource('/api/questions/:id'        ,{id: '@_id'}, restRoutes),
      'User'          : $resource('/api/users/:id'            ,{id: '@_id'}, restRoutes),
    };
  }]
);
