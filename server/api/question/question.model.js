'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	name      : String,
	_category : {
		type: Schema.Types.ObjectId,
		ref : 'Category'
	},
	question  : String,
	answer    : String,
	answeredBy: {
		type: Schema.Types.ObjectId,
		ref : 'User'
	},
	updatedBy: {
		type: Schema.Types.ObjectId,
		ref : 'User'
	},
	enabled: Boolean,
	createdAt : Date,
	answeredAt: Date
});

QuestionSchema.pre('save', function(next){
	var date = new Date();
	if (!this.createdAt){ this.createdAt = date; }
	this.updatedAt = date;
	next();
});

QuestionSchema.pre('save', function(next){
	var date = new Date();
	if (this.answeredBy){ this.answeredAt = date; }
	this.updatedAt = date;
	next();
});

module.exports = mongoose.model('Question', QuestionSchema);