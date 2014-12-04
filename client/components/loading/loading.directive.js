'use strict';

angular.module('convideoApp')
  .directive('loading', function () {
    return {
      templateUrl: 'components/loading/loading.html',
			restrict    : 'E',
			controller  : ['$rootScope', function($rootScope){
				var self = this;
				self.on = false;
				$rootScope.$on('$stateChangeStart', function(event, toState){
					if (toState.resolve) {
						self.on = true;
		    	}
				});
				$rootScope.$on('$stateChangeSuccess', function(event, toState){
					if (toState.resolve) {
						self.on = false;
		    	}
				});
				$rootScope.$on('loading', function(event, toState){
					self.on = true;
				});
				$rootScope.$on('stopLoading', function(event, toState){
					self.on = false;
				});
			}],
			controllerAs: 'loading',
    };
  });