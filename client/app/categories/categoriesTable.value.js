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
    }
  );