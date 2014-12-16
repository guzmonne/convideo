'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name        : {
		type: String,
		unique: true,
	},
	description : String,
	type        : String,
	createdAt   : Date,
	updatedAt   : Date,
	createdBy   : Schema.Types.ObjectId,
	updatedBy   : Schema.Types.ObjectId,
	enabled     : Boolean,
});

CategorySchema.pre('save', function(next){
	var date = new Date();
	if (!this.createdAt){ this.createdAt = date; }
	this.updatedAt = date;
	next();
});

module.exports = mongoose.model('Category', CategorySchema);