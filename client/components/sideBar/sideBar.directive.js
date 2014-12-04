'use strict';

angular.module('convideoApp')
  .directive('sideBar', function () {
    return {
      templateUrl: 'components/sideBar/sideBar.html',
      restrict: 'E',
      controller: ['$state', 'CategoriesCollection', function($state, CategoriesCollection){
      	var self = this;
        self.home = function(){ $state.go('main'); };
        self.collection = new CategoriesCollection();
        self.collection.fetch().then(function(){
          self.links = self.collection.links();
        });
      }],
      controllerAs: 'sideBar',
      link: function (scope, element, attrs) {
        element.find('#menu-toggle').bind('click', function(){
        	$('#wrapper').toggleClass('active');
        });
      }
    };
  });