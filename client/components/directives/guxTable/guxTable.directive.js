'use strict';

angular.module('convideoApp')
  .directive('guxTable', function ($compile) {
    return {
      templateUrl: 'components/directives/guxTable/guxTable.html',
      restrict: 'E',
      scope: {
				collection: '=',
				tableData : '=',
				edit      : '&',
      },
      controller: ['$scope', function($scope){
      	this.edit = function(id){ $scope.edit({id: id}); }
      	this.activate = function(model){ this.active = model; }
				this.sortAttr        = '_category';
				this.sortReverse     = false;
				this.sortBy          = function(attr){
					if (this.sortAttr === attr){
						this.sortReverse = !this.sortReverse;
					} else {
						this.sortAttr = attr;
					}
    		}
    		this.paginationValues = [5, 10, 25, 50, 100, 200, 500, 1000];
    		this.paginationValue  = this.paginationValues[0];
    		this.filter           = '';
    		this.collection       = $scope.collection;
    		this.currentPage      = 1;
    		this.filtered         = [];
      }],
      controllerAs: 'guxTable',
      link: function (scope, element) {
        function buildBody(){
        	var template = angular.element('<tr></tr>');
        	template.attr('ng-repeat', [
        		'model in guxTable.filtered = (guxTable.collection.pluckData() ',
        		'| orderBy:guxTable.sortAttr:guxTable.sortReverse',
        		'| filter:guxTable.filter',
        		') ',
        		'| startFrom:(guxTable.currentPage-1)*guxTable.paginationValue',
        		'| limitTo:guxTable.paginationValue',
        	].join(''));
        	template.attr('id', '{{model._id}}');
        	template.attr('ng-class','{\'active\': guxTable.active._id === model._id}');
        	template.attr('ng-click', 'guxTable.activate(model)');
        	_.forEach(scope.tableData.headers, function(column){
        		template.append('<td class="'+ (column.bodyClass || '') +'">'+ column.content +'</td>');
        	});
        	template.append([
	  					'<td class="text-center">',
								'<button ng-click="guxTable.edit((model._id || null))" class="btn btn-warning btn-xs">',
									'<i class="fa fa-pencil"></i>',
								'</button>',
							'</td>',
        		].join('')
        	);
        	return template;
        }
        function compileBody(){
        	var body = $compile(buildBody())(scope);
        	element.find('tbody').html(body);
        }
        compileBody();
      }
    };
  });