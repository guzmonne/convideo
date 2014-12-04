'use strict';

angular.module('convideoApp')
  .factory('Collection', [ 'Model', 'Sync', 'Extend', function(Model, Sync, Extend){
		/*
		** Collection
		*/
		var Collection = function(models, options){
			this.data   = [];
			options || (options = {});
			this.options = _.extend({
				silent: false,
			}, options);
			this.add(models);
		}
		/*
		** Private
		*/
		function remove(model){
			if (_.isString(model) || _.isNumber(model)){
				model = this.find(parseInt(model));
			} else if (_.isObject(model) && !_.isUndefined(model._id)){
				model = this.find(model._id);
			} else {
				return null;
			}
			var index = this.data.indexOf(model);
			if (index > -1){ this.data.splice(index, 1); this.length--; } 
			return this;
		}
		function find(id){
			return _.find(this.data, function(m){
				return m._id === id;
			});
			return null;
		}
		function push(model){
			this.data.push(model);
			this.length = this.length + 1;
			return this;
		}
		function add1(model){
			if (_.isUndefined(model) || _.isUndefined(model._id)){ return; }
			var _model = this.find(model._id);
			if (_model) { 
				_model.set(model); //this.merge(_model, model); } 
			} else { 
				model = new this.model(model);
				this.push(model);
			}
			return model;
		}
		function addM(data){
			var self = this;
			if (!_.isArray(data)){ return; }
			_.each(data, function(model){ 
				if (!_.isObject(model)){ return; }
				self.add1(model); 
			});
			return this.data;
		}
		function add(data){
			if (_.isObject(data)){ this.add1(data); }
			if (_.isArray(data)) { this.addM(data); }
		}

		function fetch(options){
			var collection = this;
			var success, promise;
			if (options){
				promise = Sync(this.model.prototype.endpoint, 'index', options);
				success = options.success;
			} else {
				promise = Sync(this.model.prototype.endpoint, 'index');
			}
			return promise.then(
				function(resp){
					collection.add(resp, options);
					if (success) { success.apply(collection, [collection, resp, options]); }
					return collection;
				}, 
				function(error){
					console.log(error);
				}
			);
			//return promise;
		}

		function pluckData(){
			var self = this;
			return _.map(self.data, function(model){
				return model.attributes;
			});
		}
		/*
		** Prototype
		*/ 	
		_.extend(Collection.prototype, {
			length    : 0,
			type      : Collection,
			remove    : remove,
			find      : find,
			push      : push,
			add       : add,
			add1      : add1,
			addM      : addM,
			first     : function(){ return this.data[0]; },
			last      : function(){ return this.data[this.length - 1]; },
			fetch     : fetch,
			pluckData : pluckData,
		});

		Collection.extend = Extend;
		/*
		** Return
		*/
		return Collection;
  }]
);

