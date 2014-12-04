'use strict';

angular.module('convideoApp')
  .factory('Model', ['$filter', '$rootScope', 'Sync', 'Extend', function($filter, $rootScope, Sync, Extend){ 	
		/*
		** Model
		*/
		var Model = function(attributes, options){
			var attrs = attributes || {};
			options || (options = {});
			this.cid        = _.uniqueId('c');
			this.attributes = {};
			if (options.collection) { this.collection = options.collection; }
			if (options.parse)      { attrs = this.parse(attrs, options) || {}; }
			attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
			this.set(attrs, options);
			this.changed = {};
			this.initialize.apply(this, [attributes, options]);
			if (this.attributes._id && !_.isUndefined(this.attributes._id)){ this._id = this.attributes._id; }
		};
		/*
		** Private
		*/
		function save(key, val, options){
			var attrs, method, promise, params, attributes = this.attributes;
			//this.saveData();
			if (key === null || _.isObject(key)){
				attrs   = key;
				options = val;
			} else {
				(attrs = {})[key] = val;
			}
			options = _.extend({}, options);
			var model   = this;
			var success = options.success;
			options.success = function(resp){
				model.attributes = attributes;
				var serverAttrs  = model.parse(resp, options);
				if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) { return false; }
				if (success){ success(model, resp, options); }
				$rootScope.$broadcast(model.endpoint.toLowerCase() + ':sync:', resp, options);
			};
			method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
			if (method === 'patch') { 
				params = _.extend({ id: this._id}, attrs); 
			} else {
				params = this.attributes;
			}
			promise = this.sync(this.endpoint, method, params);
			promise.then(options.success, function(error){console.log(error);});
			return promise;
		}

		function set(key, val, options){
			var attr, attrs, unset, changes, silent, changing, prev, current;
			if (key === null){ return this; }
			if (typeof key === 'object'){
				attrs   = key;
				options = val;
			} else {
				(attrs = {})[key] = val;
			}
			options || (options = {});
			unset          = options.unset;
			silent         = options.silent;
			changes        = [];
			changing       = this._changing;
			this._changing = true;
			if (!changing){
				this._previousAttributes = _.clone(this.attributes);
				this.changed = {};
			}
			current = this.attributes, prev = this._previousAttributes;
			//if (this.idAttribute in attrs){ this.id = attrs[this.idAttribute]; }
			if (!_.isUndefined(attrs._id)){ this._id = attrs._id; }
			for (attr in attrs){
				if (attrs.hasOwnProperty(attr)){
					val = attrs[attr];
					if (!_.isEqual(current[attr], val)){ changes.push(attr); }
					if (!_.isEqual(prev[attr], val)){
						this.changed[attr] = val;
					} else {
						delete this.changed[attr];
					}
					unset ? delete current[attr] : current[attr] = val;
				}
			}
			if (!silent){
				if (changes.length) this._pending = options;
			}
			if (changing) return this;
			if (!silent){
				while (this._pending){
					options       = this._pending;
					this._pending = false;
				}
			}
			this._pending  = false;
			this._changing = false;
			return this;
		}

		function clear(options){
			var attrs = this.defaults;
			this._id  = void 0;
			for (var key in this.attributes) { attrs[key] = void 0; }
			return this.set(attrs, _.extend({}, options, {unset: true}));
		}

		function hasChanged(attr){
			if (attr === null) { return !_.isEmpty(this.changed); }
			return _.has(this.changed, attr);
		}

		function previous(attr){
			if (attr === null || this._previousAttributes) { return null; }
			return this._previousAttributes[attr];
		}

		function previousAttributes(){ return _.clone(this._previousAttributes); }

		function fetch(options){
			if (_.isString(options) && this.isNew()){ this._id = options; }
			if (!this._id){ return false; }
			options = options ? _.clone(options) : {};
			if (options.parse === void 0) { options.parse = true; }
			var model   = this;
			var success = options.success;
			this.sync(this.endpoint, 'show', { id: this._id }).then(
				function(resp){
					if (!model.set(model.parse(resp, options), options)){ return false; }
					if (success) success(model, resp, options);
					$rootScope.$broadcast('sync:' + model.endpoint, resp, options);
				}, 
				function(error){console.log(error);}
			);
		}

		function destroy(options){
			if (!this._id){ return false; }
			options = options ? _.clone(options) : {};
			var model = this;
			var success = options.success;
			var destroy = function(){
				$rootScope.$broadcast('destroy:' + model.endpoint, model, model.collection, options);
			};
			options.success = function(resp){
				if (options.wait || model.isNew()) { destroy(); }
				if (success) { success(model, resp, options); }
				if (!model.isNew()) { $rootScope.$broadcast('sync:' + model.endpoint, model, resp, options); }
			}
			if (this.isNew()){
				optiosn.success();
				return false;
			}
			var promise = this.sync(this.endpoint, 'destroy', {id: this._id});
			promise.then(options.success, function(error){console.log(error);});
			return promise;
		}

		function getInDate(attr, format){
			format || (format = 'dd/MM/yyyy');
			console.log($filter('date')(this.get(attr), format));
			return $filter('date')(this.get(attr), format);
		}

		//function saveData(){
		//	this.set(this.data);
		//	this.data = {};
		//	return this;
		//}
		/*
		** Prototype
		*/
		_.extend(Model.prototype, {
			type               : Model,
			endpoint           : 'Model',
			sync               : Sync,
			changed            : null,
			//data               : {},
			idAttribute        : '_id',
			initialize         : function(){},
			toJSON             : function(options){ return _.clone(this.attributes); },
			get                : function(attr)   { return this.attributes[attr]; },
			escape             : function(attr)   { return _.escape(this.get(attr)); },
			set                : set,
			unset              : function(attr, options){ return this.set(attr, void 0, _.extend({}, options, {unset: true})); },
			clear              : clear,
			hasChanged         : hasChanged,
			previous           : previous,
			parse              : function(attrs){ return attrs; },
			isNew              : function()     { return !this.has(this.idAttribute); },
			has                : function(attr) { return !_.isUndefined(this.get(attr)); },
			save               : save,
			fetch              : fetch,
			defaults           : {},
			previousAttributes : previousAttributes,
			//saveData           : saveData,
		});
		Model.extend = Extend;
		/*
		** Return
		*/
		return Model;
  }]
);
