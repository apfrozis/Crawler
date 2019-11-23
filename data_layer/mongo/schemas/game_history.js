// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameHistorySchema = new Schema(
{
	game_id:
	{
		type: Schema.ObjectId,
		index: true
    },
    game_id_str:
	{
		type: String
    },
    result : String,
    satisfyOver15 : Boolean,
    satisfyOver25 : Boolean,
    satisfyOver35 : Boolean,
	created:
	{
		type: Date,
		default: Date.now
	},
});


// make this available to our users in our Node applications
module.exports = gameHistorySchema;