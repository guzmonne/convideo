'use strict';

angular.module('convideoApp')
  .value('categoriesTableValue', 
    {
      headers: [
        {
          header   : 'Nombre',
          attribute: 'name',
          visible  : true,
          content  : '{{ model.name }}'
        },
        {
          header   : 'Descripción',
          attribute: 'description',
          visible  : true,
          content  : '{{ model.description }}'
        },
        {
          header   : 'Creado',
          attribute: 'createdAt',
          visible  : true,
          content  : '{{ model.createdAt | date: \'dd/MM/yyyy\' }}'
        },
      ],
      options: {
        controlsTemplate: '<button ng-click="guxTable.actions(model._id)" class="btn btn-xs margin-left-1-2" ng-class="{false: \'btn-success\', true: \'btn-danger\'}[model.enabled === undefined || model.enabled === false]"><i class="fa" ng-class="{false: \'fa-eye\', true: \'fa-eye-slash\'}[model.enabled === undefined || model.enabled === false]"></i></button>'
      }
    }
  );