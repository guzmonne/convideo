'use strict';

var _ = require('lodash');
var Question = require('./question.model');
var User = require('../user/user.model');

// Get list of questions
exports.index = function(req, res) {
  var query = {};
  if (req.query._category){ query._category = req.query._category; }
  if (req.query.enabled)  { query.enabled   = req.query.enabled; }
  Question
    .find(query)
    .populate('_category', 'name')
    .populate('answeredBy', 'name')
    .populate('updatedBy', 'name')
    .exec(function (err, questions) {
      if(err) { return handleError(res, err); }
      return res.json(200, questions);
    });
};

// Get a single question
exports.show = function(req, res) {
  Question.findById(req.params.id, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    return res.json(question);
  });
};

// Creates a new question in the DB.
exports.create = function(req, res) {
  Question.create(req.body, function(err, question) {
    if(err) { return handleError(res, err); }
    return res.json(201, question);
  });
};

// Updates an existing question in the DB.
exports.update = function(req, res) {
  if(req.body.answer && !req.body.answeredBy){
    req.body.answeredBy = req.user._id;
  }
  if (_.isObject(req.body._category)  && req.body._category._id ) { req.body._category = req.body._category._id; }
  if (_.isObject(req.body.answeredBy) && req.body.answeredBy._id) { req.body.answeredBy = req.body.answeredBy._id; }
  if (_.isObject(req.body.updatedBy)  && req.body.updatedBy._id ) { req.body.updatedBy = req.body.updatedBy._id; }
  if(req.body._id) { delete req.body._id; }
  req.body.updatedBy = req.user._id;
  Question.findById(req.params.id, function (err, question) {
    if (err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    var updated = _.merge(question, req.body);
    console.log(req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200);
    });
  });
};

// Deletes a question from the DB.
exports.destroy = function(req, res) {
  Question.findById(req.params.id, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    question.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}