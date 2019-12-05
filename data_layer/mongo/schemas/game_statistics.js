var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

//todos os meses
var gameModelSchema = new Schema({
  game_key : String,
  totalGameAtLeastOnePositive : Number,

  //1.5
   totalOver15 : Number,
   totalUnder15 : Number,
   
   satisfyOver15 : Number,
   satisfyUnder15 : Number,
   notSatisfyUnder15 : Number,
   notSatisfyOver15 : Number,

    //2.5 market

   totalOver25 : Number,
   totalUnder25 : Number,

   satisfyOver25 : Number,
   satisfyUnder25 : Number,
   notSatisfyUnder25 : Number,
   notSatisfyOver25 : Number,

    //3.5 market

    totalOver35 : Number,
    totalUnder35 : Number,

    satisfyOver35 : Number,
    satisfyUnder35 : Number,
    notSatisfyUnder35 : Number,
    notSatisfyOver35 : Number,

    


  created:
	{
		type: Date,
		default: Date.now
	},
});




module.exports = gameModelSchema;

