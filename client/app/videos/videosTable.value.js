'use strict';

angular.module('convideoApp')
  .value('videosTableValue', 
    {
      headers: [
        {
          header   : 'Categoría',
          attribute: '_category.name',
          visible  : true,
          content  : '{{ model._category.name }}',
        },
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
          content  : '{{ model.description | limitTo:(tableData.options.descriptionsLength[model._id] || 200)}} <button ng-click="tableData.options.showAll(model._id)" class="btn btn-xs"><i class="fa" ng-class="{true: \'fa-minus\', false: \'fa-plus\'}[tableData.options.descriptionsLength[model._id] > 200]"></i></button>'
        },
        {
          header   : 'Tipo',
          attribute: 'type',
          visible  : true,
          content  : '{{ model.type }}'
        },
        {
          header   : 'Creado',
          attribute: 'createdAt',
          visible  : true,
          content  : '{{ model.createdAt | date: \'dd/MM/yyyy\' }}'
        },
        {
          header   : 'Usuarios',
          attribute: 'createdBy.name',
          headerClass: 'column-2x',
          visible  : true,
          content  : '<small class="text-muted">Creado: </small>{{ model.createdBy.name }} <span ng-id="{{model.updatedBy}}"><br /><small class="text-muted">Modificado: </small>{{model.updatedBy.name}}</span>'
        },
      ],
      options: {
        showAll: function(id){
          var length = this.descriptionsLength[id];
          this.descriptionsLength[id] = (_.isUndefined(length) || length === 200) ? 3000 : 200;
        },
        descriptionsLength: [],
      }
    }
  );