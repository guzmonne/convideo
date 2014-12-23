'use strict';

angular.module('convideoApp')
  .service('videosTableValue', function(controlsTemplateValue, toggleEnable){
    return {
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
          content  : '{{ model.description | limitTo:(guxTable.controller.descriptionsLength[model._id] || 200)}} <button ng-hide="model.description.length < 201 || !model.description" ng-click="guxTable.controller.showAll(model._id)" class="btn btn-xs"><i class="fa" ng-class="{true: \'fa-minus\', false: \'fa-plus\'}[guxTable.controller.descriptionsLength[model._id] > 200]"></i></button>'
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
          content  : '<small class="text-muted">Creado: </small><span class="pull-right">{{ model.createdBy.name }}</span> <span ng-if="model.updatedBy"><br /><small class="text-muted">Modificado: </small><span class="pull-right">{{model.updatedBy.name}}</span></span>'
        },
      ],
      options: {
        controller: {
          descriptionsLength : [],
          showAll            : function(id){
            var length = this.descriptionsLength[id];
            this.descriptionsLength[id] = (_.isUndefined(length) || length === 200) ? 3000 : 200;
          },
          toggleEnable: toggleEnable({ on: 'Habilitado', off: 'Deshabilitado', modelName: 'Video' }),
        },
        controlsTemplate: controlsTemplateValue,
      }
    }
  });