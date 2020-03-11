const Schema = require('mongoose').Schema

const GameLogSchema = new Schema({
    key : String,
    alg_date: Date,
    alg_total_analisados : String,
    alg_total_passaram : String,
    results_date: Date,
    results_analisados : String,
    results_passaram : String,
    created:
	{
		type: Date,
		default: Date.now
	},

},
{ collection: 'stats_game_log'})

module.exports = GameLogSchema