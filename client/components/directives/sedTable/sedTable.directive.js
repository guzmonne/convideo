'use strict';
 /*jshint camelcase: false */

angular.module('convideoApp')
  .directive('sedTable', function ($compile) {
    return {
      restrict: 'E',
      controller: ['$scope', 'Auth', function($scope, Auth){
      	var self = this;
      	/*
			  ** Public
			  */
			  _.extend(self, {
			    sortField      : '_id',
			    sortReverse    : false,
			    searchString   : '',
			    filterField    : '',
			    filterFieldName: null,
			    modelsPerPage  : 10,
			    totalItems     : 0,
			    currentPage    : 1,
			  });

			  self.isAdmin = Auth.isAdmin;
			  
			  /*
			  ** Private
			  */
			  self.sort = function(attribute){
			    self.sortReverse = (self.sortField === attribute) ? !self.sortReverse : false;
			    self.sortField   = attribute;
			  }
			  self.search = function(){
					var object = {};
					var array  = [];
			    if (self.filterField === ''){ return self.searchString; }
			    array = self.filterField.split('.');
			    if (array.length > 1){
			      for (var i = 0; i < array.length; i++){
			        if (i === 0){ object[array[0]] = {};  
			        } else if ( i === array.length - 1 ){
			          object[array[i-1]][array[i]] = self.searchString;
			        } else {
			          object[array[i-1]][array[i]] = {};
			        }
			      }
			      return object;
			    }
			    object[self.filterField] = self.searchString;
			    console.log(object);
			    return object;
			  }

			  self.selectFilterField = function(column){
			    if (_.isUndefined(column)){ column = { name: null, attribute: '' }; } 
			    self.filterFieldName = column.name;
			    self.filterField     = column.attribute;
			  }

			  self.selectRow = function(model){
			    if (self.selectedModel && self.selectedModel._id === model._id){ 
			    	self.selectedModel = null; 
			    	return; 
			    }
			    self.selectedModel = model;
			  }

			  self.detailsState = function(){
			    if (!self.selectedModel){ return '/'; }
			    return self.type + '/' + self.selectedModel._id;
			  }
      }],
      controllerAs: 'sedTable',
    }
  });