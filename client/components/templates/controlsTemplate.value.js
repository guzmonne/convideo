'use strict'

angular.module('convideoApp')
	.value('controlsTemplateValue',
		[
			'<button ',
				'ng-click="guxTable.controller.toggleEnable(model._id, guxTable.collection)"',
				'class="btn btn-xs margin-left-1-2"',
				'ng-class="{false: \'btn-success\', true: \'btn-danger\'}[model.enabled === undefined || model.enabled === false]">',
					'<i class="fa"', 
						'ng-class="{false: \'fa-eye\', true: \'fa-eye-slash\'}[model.enabled === undefined || model.enabled === false]">',
					'</i>',
			'</button>'
		].join('')
	);
