'use strict'

angular.module('convideoApp')
	.service('toggleEnable', function(toaster){
		return function(config){
			return function(id, collection){
        var msg, id = id,
            model = collection.find(id);
        model.set('enabled', !model.get('enabled'));
        msg = (model.get('enabled')) ? config.on : config.off;
        model.save().then(function(){
          toaster.add({
            title : config.modelName + ' ' + msg,
            type  : 'success'
          });
        });
      }
		}
	});