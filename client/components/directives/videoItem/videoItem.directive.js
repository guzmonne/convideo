'use strict';

angular.module('convideoApp')
  .directive('videoItem', function ($rootScope) {
    return {
      templateUrl: 'components/directives/videoItem/videoItem.html',
      scope: {
				model  : '=',
				onClick: '&',
      },
			controller  : ['$scope', function($scope){
				this.model       = $scope.model;
				this.onClick     = $scope.onClick;
				this.select = function(){
					this.onClick({model: this.model});
				};
			}],
			controllerAs: 'video',
			restrict    : 'E',
      link: function (scope, element, attrs) {
        element.find('button[name=playNow]').bind('click', function(){
        	$rootScope.$emit('video:selected', scope.model.id);
        	element.find('a.list-group-item').removeClass('active').addClass('active');
        });
        $rootScope.$on('video:selected', function(id){
        	if (scope.model.id !== id){ element.find('a.list-group-item').removeClass('active'); }
        });
        if (attrs.active === 'true'){element.find('a.list-group-item').addClass('active');}
      }
    };
  });