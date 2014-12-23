'use strict';

var _        = require('lodash');
var Category = require('./category.model');

// Get list of categories
exports.index = function(req, res) {
  var query = (_.isUndefined(req.query.enabled)) ? {} : {enabled: req.query.enabled}; 
  Category
    .find(query)
    .populate('createdBy', 'name')
    .exec(function (err, categorys) {
      if(err) { return handleError(res, err); }
      return res.json(200, categorys);
    });
};

// Get a single category
exports.show = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    return res.json(category);
  });
};

// Creates a new category in the DB.
exports.create = function(req, res) {
  req.body.createdBy = req.user._id;
  req.body.updatedBy = req.user._id;
  var body = req.body;
  body.createdBy = req.user._id;
  Category.create(body, function(err, category) {
    if(err) { return handleError(res, err); }
    return res.json(201, category);
  });
};

// Updates an existing category in the DB.
exports.update = function(req, res) {
  var body = req.body;
  req.body.updatedBy = req.user._id;
  if(body._id) { delete body._id; }
  Category.findById(req.params.id, function (err, category) {
    if (err) { return handleError(err); }
    if(!category) { return res.send(404); }
    var updated = _.merge(category, body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, category);
    });
  });
};

// Deletes a category from the DB.
exports.destroy = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    category.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}