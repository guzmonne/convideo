'use strict';

angular.module('convideoApp')
  .directive('newVideo', function () {
    return {
      templateUrl: 'app/videos/newVideo/newVideo.html',
      restrict: 'E',
      scope: {
        editModel : '=',
        categories: '=',
      },
      controller: ['$rootScope', '$scope', '$upload', 'VideosModel', 'toaster', function($rootScope, $scope, $upload, VideosModel, toaster){
        var self      = this;
        self.model    = new VideosModel();
        self.rootUrl  = '/api/videos/upload/';
        self.fileName = '';
        self.progress = 0;
        self.upload   = function(file, callback){
          return $upload
            .upload({
              url    : self.rootUrl + (self.model.get('name') || _.uniqueId('video_')),
              method : 'POST',
              file   : file,
            })
            .progress(function(evt){
              self.progress = parseInt(100.0 * evt.loaded / evt.total);
            })
            .success(function(data){
              toaster.add({
                type   : 'success',
                title  : 'Exito!',
                message: 'Su video se ha subido correctamente.'
              });
              self.progress = 0;
              self.model.set('source', '/assets/videos/' + data.name);
              callback(data);
            })
            .error(function(){
              toaster.add({
                type   : 'danger',
                title  : 'Error!',
                message: 'Ha ocurrido un error inesperado al intentar subir el video'
              });
              $rootScope.$emit('stopLoading');
            });
        };
        self.submit = function(){
          if (self.model.get('type') === 'Video Local' && self.file){
            $rootScope.$emit('loading');
            self.upload(self.file, self.save);
          } else {
            self.save();
          }
      	};
        self.pluckData = function(){
          self.categories = $scope.categories.pluckData();
        };
        self.fetchCategories = function(e){
          if (e) { e.preventDefault(); }
          var promise = $scope.categories.fetch();
          promise.then(function(){ self.pluckData(); });
          return promise;
        };
        self.fileChange = function(files, e){
          var file = files[0];
          self.file = file;
        };
        self.save = function(){
          self.model.save().then(function(){
            if (self.model.isNew()){
              toaster.add({
                type   : 'success',
                title  : 'Exito!',
                message: 'Video creado con exito.'
              });
            } else {
              toaster.add({
                type   : 'success',
                title  : 'Exito!',
                message: 'Video actualizado con exito.'
              });
            }
          });
          if (self.model.isNew()) {self.model = new VideosModel();}
          $rootScope.$emit('stopLoading');
        };
        self.toggleUploadField = function(e){
          if (e) e.preventDefault();
          var oldSource = self.model.get('oldSource');
          if (oldSource){
            self.model.set('source', self.model.get('oldSource'));
            self.model.set('oldSource', undefined);
          } else {
            self.model.set('oldSource', self.model.get('source'));
            self.model.set('source', undefined);
          }
        };
      }],
      controllerAs: 'newVideo',
      link: function (scope) {
        scope.$watch('editModel', function(n){
          if (n === undefined || n === null){ return; }
          scope.newVideo.model = n;
        });
        scope.$watch('categories', function(n){
          if (n){ scope.newVideo.pluckData(); }
        });
      }
    };
  });