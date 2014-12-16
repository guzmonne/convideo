'use strict';

angular.module('convideoApp')
  .factory('CategoriesCollection', function (Collection, CategoriesModel) {
    var CategoriesCollection = Collection.extend({
      model: CategoriesModel,
      links: function(){
      	var collection = this;
      	return _.map(collection.data, function(model){
      		var url = 'videos/' + model._id;
      		return {
            name    : model.get('name'),
            enabled : model.get('enabled'),
            icon    : model.icon[model.get('type')],
            url     : url
      		};
      	});
      },
      names: function(){
				var collection = this;
				var result     = {};
      	_.forEach(collection.data, function(model){
      		result[model.get('_id')] = model.get('name');
      	});
      	return result;
      }
    });
    return CategoriesCollection;
  });
