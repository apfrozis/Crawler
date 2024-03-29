var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var gameModelSchema = new Schema({
  game_key : String,
  equipaCasa: {},
  equipaFora: {},
  liga: String,
  href: String,
  over15: String, 
  over25: String, 
  over35: String, 
  gameDate: Date,
  over15validation: String,
  over25validation: String,
  over35validation: String,
  over15standardDeviation: String,
  over25standardDeviation : String,
  over35standardDeviation : String,
  gameStatshref: String,
  goalsScoredPlusConceded: String,
  goalsScoredLast4GamesHome: String,
  goalsConcededLast4GamesHome: String,
  goalsScoredLast4GamesAway: String,
  goalsConcededLast4GamesAway: String,
  gameHistory : {
    totalScore : String, 
    homeTotalGoals : String, 
    awayTotalGoals : String,
    satify15 : String, 
    satify25 : String, 
    satify35 : String 

  },
  
  created:
	{
		type: Date,
		default: Date.now
	},
});

// Compile model from schema

gameModelSchema.methods.computeKey = function(){

  console.log('before compute the key ', this);

  let gameDate = new Date(this.gameDate);
  

  let league = this.href.split('=').length > 0 ? this.href.split('=')[1] : 'NA';
  let homeTeam = this.equipaCasa.nomeEquipa.toLowerCase().replace(/\s/g, '') ;
  let awayTeam = this.equipaFora.nomeEquipa.toLowerCase().replace(/\s/g, '') ;

  this.game_key = league + '_' + homeTeam + '_' + awayTeam + '_' + gameDate.getDay() + gameDate.getMonth() + gameDate.getFullYear() ;

  console.log('after compute the key ', this);
  return this.game_key  ;
}

gameModelSchema.methods.findById = function (id, cb) {
    return this.model('Animal').find({ id : id }, cb);
  };



module.exports = gameModelSchema;

