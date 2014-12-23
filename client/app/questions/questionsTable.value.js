'use strict';

angular.module('convideoApp')
  .value('questionsTableValue', 
    {
      headers: [
        {
          header   : 'Categoría',
          attribute: '_category',
          visible  : true,
          content  : '{{ model._category.name }}'
        },
        {
          header   : 'Nombre',
          attribute: 'name',
          visible  : true,
          content  : '{{ model.name }}'
        },
        {
          header   : 'Pregunta',
          attribute: 'question',
          visible  : true,
          content  : '{{ model.question }}'
        },
        {
          header   : 'Respondido',
          attribute: 'answer',
          bodyClass: 'text-center',
          visible  : true,
          content  : '<i class="fa" ng-class="{\'fa-check text-success\': model.answer, \'fa-minus text-muted\': !model.answer}"></i>'
        },
        {
          header   : 'Creado',
          attribute: 'createdAt',
          visible  : true,
          content  : '{{ model.createdAt | date: \'dd/MM/yyyy\' }}'
        },
        {
          header   : 'Respondido',
          attribute: 'answeredBy.name',
          visible  : true,
          content  : '{{ model.answeredBy.name }}'
        },
        {
          header   : 'Modificado',
          attribute: 'updatedBy.name',
          visible  : true,
          content  : '{{ model.updatedBy.name }}'
        },
      ],
      options: {
        categoryIDtoName: [],
        controlsTemplate: '<button ng-click="guxTable.actions(model._id)" class="btn btn-xs margin-left-1-2" ng-class="{false: \'btn-success\', true: \'btn-danger\'}[model.enabled === undefined || model.enabled === false]"><i class="fa" ng-class="{false: \'fa-eye\', true: \'fa-eye-slash\'}[model.enabled === undefined || model.enabled === false]"></i></button>',
      }
    }
  );