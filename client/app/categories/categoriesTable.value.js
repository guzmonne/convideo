'use strict';

angular.module('convideoApp')
  .service('categoriesTableValue', function(controlsTemplateValue, toggleEnable){
    return {
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
        controller: {
          toggleEnable: toggleEnable({ on: 'Habilitada', off: 'Deshabilitada', modelName: 'Categoría' })
        },
        controlsTemplate: controlsTemplateValue,
      }
    }
  });