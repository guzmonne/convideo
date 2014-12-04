'use strict';

angular.module('convideoApp')
  .directive('newVideo', function () {
    return {
      templateUrl: 'app/videos/newVideo/newVideo.html',
      restrict: 'E',
      scope: {
        editModel : "=",
        categories: "=",
      },
      controller: ['$scope', '$upload', 'VideosModel', 'toaster', function($scope, $upload, VideosModel, toaster){
        var self      = this;
        self.model    = new VideosModel();
        self.rootUrl  = '/api/videos/upload/';
        self.fileName = '';
        self.upload   = function(file){
          $upload
            .upload({
              url    : self.rootUrl + (self.model.get('name') || _.uniqueId('video_')),
              method : 'POST',
              file   : file,
            })
            .progress(function(evt){
              console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.file.name);
            })
            .success(function(data, status, headers, config){
              console.log(data);
            });
        };
        self.submit = function(){
      		self.model.save().then(function(){
            if (self.model.isNew()){
              toaster.add({
                type   :'success',
                title  : "Exito!",
                message: "Video creado con exito."
              });
            } else {
              toaster.add({
                type   :'success',
                title  : "Exito!",
                message: "Video actualizado con exito."
              });
            }
          });
      		if (self.model.isNew()) {self.model = new VideosModel();}
      	};
        self.pluckData = function(){
          self.categories = $scope.categories.pluckData();
        };
        self.fetchCategories = function(e){
          if (e) { e.preventDefault(); }
          var promise = $scope.categories.fetch()
          promise.then(function(){ self.pluckData(); });
          return promise;
        };
        self.fileChange = function(files, e){
          console.log(self, files, e);
          var file = files[0];
          self.upload(file);
        }
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