'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VideoSchema = new Schema({
	_category   : {
		type: Schema.Types.ObjectId,
		ref : 'Category'
	},
	name        : String,
	description : String,
	type        : String,
	source      : String,
	author      : String,
	image       : String,
	createdBy   : {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	createdAt   : Date,
	updatedBy   : {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	updatedAt   : Date,
	enabled     : Boolean,
});

VideoSchema.pre('save', function(next){
	var date = new Date();
	if (!this.createdAt){ this.createdAt = date; }
	this.updatedAt = date;
	next();
});

module.exports = mongoose.model('Video', VideoSchema);