'use strict';

angular.module('convideoApp')
  .factory('CategoriesModel', function (Model) {
    var CategoriesModel = Model.extend({
      endpoint: 'Category',
	  	icon: {
				'Videos'     : 'fa-video-camera',
				'FAQ'        : 'fa-question',
				'Documentos' : 'fa-file-text-o'
	  	},
      defaults: {
      	type: 'Videos',
      }
    });
    return CategoriesModel;
  });
