'use strict';

angular.module('convideoApp')
  .controller('VideosCtrl', function ($scope, $stateParams, anchorSmoothScroll, videos, questions) {
    var self        = this;
    self.collection = videos
    self.current    = self.collection.first();
    self.questions  = questions
    self.showForm   = false;
    self.toggleForm = function(e){ return this.showForm = !this.showForm; };
    self.setCurrent = function(model){
  		self.current = model;
  		anchorSmoothScroll.scrollTo('video-title');
  	};
    self._category = $stateParams._category;
  });
