'use strict';

var _      = require('lodash');
var Video  = require('./video.model');
var fs     = require('fs');
var path   = require('path');
var crypto = require('crypto');
var config = require('../../config/environment');

// Get list of videos
exports.index = function(req, res) {
  var query = {};
  if (req.query._category){ query._category = req.query._category; }
  Video
    .find(query)
    .populate('_category', 'name')
    .populate('createdBy', 'name')
    .populate('updatedBy', 'name')
    .exec(function (err, videos) {
      if(err) { return handleError(res, err); }
      return res.json(200, videos);
    });
  //Video.find(query);
};

// Get a single video
exports.show = function(req, res) {
  Video.findById(req.params.id, function (err, video) {
    if(err) { return handleError(res, err); }
    if(!video) { return res.send(404); }
    return res.json(video);
  });
};

// Creates a new video in the DB.
exports.create = function(req, res) {
  if(_.isObject(req.body._category)) { req.body._category = req.body._category._id; }
  req.body.createdBy = req.user._id;
  Video.create(req.body, function(err, video) {
    if(err) { return handleError(res, err); }
    video.populate('_category', 'name').populate('createdBy', 'name', function(err){
      if(err) { return handleError(res, err); }
      return res.json(201, video);
    });
  });
};

// Updates an existing video in the DB.
exports.update = function(req, res) {
  if(_.isObject(req.body._category)) { req.body._category = req.body._category._id; }
  if(req.body._id)       { delete req.body._id; }
  if(req.body.createdBy) { delete req.body.createdBy; }
  req.body.updatedBy = req.user._id;
  Video.findById(req.params.id, function (err, video) {
    if (err) { return handleError(err); }
    if(!video) { return res.send(404); }
    var updated = _.merge(video, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200);
    });
  });
};

// Deletes a video from the DB.
exports.destroy = function(req, res) {
  Video.findById(req.params.id, function (err, video) {
    if(err) { return handleError(res, err); }
    if(!video) { return res.send(404); }
    video.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Manages de Upload of a Video
exports.upload = function(req, res, next){
  var data = _.pick(req.body, 'type'),
      file = req.files.file;
  console.log(file, data);
  if (!file){ return res.send(404); }
  var newPath = config.assets + "/videos/" + file.name;
  fs.rename(file.path, newPath, function(err){
    if (err) { return handleError(res, err); }
    res.json(200, {name: file.name});
  });
};

function handleError(res, err) {
  return res.send(500, err);
}