'use strict';

angular.module('convideoApp')
  .directive('videosTable', function ($compile) {
    return {
      templateUrl: 'components/templates/defaultTable.html',
      restrict: 'A',
      scope: {
        collection : '=',
        type       : '@',
        delete     : '&',
      },
      require: '^sedTable',
      link: function (scope, element, attrs, sedTable) {
				scope.sedTable            = sedTable;
				scope.sedTable.collection = scope.collection;
				scope.sedTable.delete     = scope.delete;
				scope.sedTable.data       = [
          { attribute: '_category'  , name: 'Categoría'   , show: true, content: '{{model.get(\'_category\')}}' },
          { attribute: 'name'       , name: 'Nombre'      , show: true, content: '{{model.get(\'name\')}}' },
          { attribute: 'description', name: 'Descripción' , show: true, content: '{{model.get(\'description\')}}' },
          { attribute: 'type'       , name: 'Tipo'        , show: true, content: '{{model.get(\'type\')}}' },
          { attribute: 'createdAt'  , name: 'Creado'      , show: true, content: '{{model.getInDate(\'createdAt\')}}' },
          { attribute: 'createdBy'  , name: 'Usuario'     , show: true, content: '{{model.get(\'createdBy\')}}' },
        ]
				scope.sortField = '_category'; 
        /*
        ** Watchers
        */
        scope.$watch('sedTable.collection', function(n){
          scope.sedTable.totalItems = n.length;
        });
        /*
        ** Public
        */
        scope.sedTable.remove = function(model){
          scope.delete({model: model});
        }
        /*
        ** Private
        */
        function buttonsFor(type){
          return [
            '<td class="vertical-align-middle row-controls">',
              '<div class="btn-toolbar">',
                '<div class="btn-group">',
                  '<button class="btn btn-info btn-xs">',
                    '{{model.name}} <i class="fa fa-ellipsis-h fa-fw"></i>',
                  '</button>',
                '</div>',
                '<div class="btn-group pull-right">',
                  '<button class="btn btn-danger btn-xs" ng-if="sedTable.isAdmin()" ng-click="sedTable.remove(model)">',
                    '<i class="fa fa-trash-o fa-fw"></i>',
                  '</button>',
                '</div>',
              '</div>',
            '</td>'
          ].join('');
        }
        function buildTable(){
          var head   = angular.element('<tr></tr>');
          var body   = angular.element('<tr></tr>');
          // Table data iteration
          _.each(scope.sedTable.data, function(column, index){
            var headerClass = (column.headerClass) ? ' class="' + column.headerClass + '"' : '';
            var columnClass = (column.columnClass) ? ' class="' + column.columnClass + '"' : '';
            head.append('<th'+headerClass+' class="pointer" ng-click="sedTable.sort(\''+column.attribute+'\')" ng-show="sedTable.data['+index+'].show">'+column.name+'<i class="pull-right fa" ng-class="{\'fa-chevron-down\': sedTable.sortField === \''+column.attribute+'\' && sedTable.sortReverse === true, \'fa-chevron-up\': sedTable.sortField === \''+column.attribute+'\' && sedTable.sortReverse === false }"></i>'+'</th>');
            body.append('<td'+columnClass+' ng-show="sedTable.data['+index+'].show">'+column.content+'</td>');
          });
          	console.log(body.html());
          // Body config
          body.append(buttonsFor(scope.type));
          body.attr('ng-repeat', [
              'model in sedTable.collection.data',
              '| orderBy:sedTable.sortField:sedTable.sortReverse',
              '| filter:sedTable.search()',
              '| startFrom:(sedTable.currentPage-1) * sedTable.modelsPerPage',
              '| limitTo:sedTable.modelsPerPage',
            ].join('') 
          );
          body.attr('ng-click', 'sedTable.selectRow(model)');
          body.attr('ng-class', '{ \'row-selected\': sedTable.selectedModel._id === model._id }');
          // Compilation
          head = $compile(head)(scope);
          body = $compile(body)(scope);
          element.find('thead').html(head);
          element.find('tbody').html(body);
        }
        function hideColumns(){
          var hideColumnsArray = scope.$eval(attrs.hideColumnsArray);
          _.forEach(hideColumnsArray, function(columnName){
            var column = _.find(scope.sedTable.data, function(column){return column.attribute === columnName;});
            if (column) { column.show = false; }
          });
        }
        /*
        ** Initialize
        */
        buildTable();
        hideColumns();
      }
    };
  });