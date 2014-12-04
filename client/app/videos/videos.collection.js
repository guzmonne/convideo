'use strict';

angular.module('convideoApp')
  .factory('VideosCollection', function (Collection, VideosModel, Api) {
    var VideosCollection = Collection.extend({
    	constructor: function(models, options){
    		options || (options = {});
    		if (options._category){
    			this._category = options._category;
    			delete options._category;
    		}
    		Collection.prototype.constructor.apply(this, arguments);
    	},
      model: VideosModel,
      fetch: function(options){
    		var promise;
        options || (options = {});
      	if (this._category){
      		var collection =  this;
      		var success = options.success;
      		promise = Api['Video']['index']({_category: this._category}, function(resp){
      			collection.add(resp);
      			if (success) { success.apply(collection, [collection, resp, options]); }
      		}).$promise;
      	} else {
      		promise = Collection.prototype.fetch.apply(this, [options]);
      	}
        return promise;
      },
      name : 'Videos',
    });
    return VideosCollection;
  });
