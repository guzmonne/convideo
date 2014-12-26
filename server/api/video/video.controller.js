'use strict';

var _      = require('lodash');
var Video  = require('./video.model');
var fs     = require('fs');
var path   = require('path');
var crypto = require('crypto');
var config = require('../../config/environment');
var ffmpeg = require('fluent-ffmpeg');

// Set FFMPEG path
ffmpeg.setFfmpegPath('/home/gmonne/bin/ffmpeg');
ffmpeg.setFfprobePath('/home/gmonne/bin/ffprobe');

// Get list of videos
exports.index = function(req, res) {
  var query, params = {};
  if (req.query._category){ params._category = req.query._category; }
  if (req.query.enabled)  { params.enabled   = req.query.enabled; } 
  query = Video
    .find(params)
    .populate('_category', 'name')
    .populate('createdBy', 'name')
    .populate('updatedBy', 'name');
  console.log(req.query.limitTo);
  if (req.query.limitTo){
    console.log('I need to limit the query');
    query = query.limit(parseInt(req.query.limitTo));
  }
  query.exec(function (err, videos) {
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
  var data     = _.pick(req.body, 'type'),
      file     = req.files.file,
      fileName;
  if (!file){ return res.send(404); }
  fileName = (new Date().getTime()) + '_' + (file.name.substr(0, file.name.lastIndexOf('.')) || file.name).replace(/ /g,"_") + '.mp4';
  var newPath = config.assets + "/videos/" + fileName;
  ffmpeg(file.path).save(newPath);
  res.json(200, {name: fileName});
};

function handleError(res, err) {
  return res.send(500, err);
}
