
//define and use new datalayer..
const {Database,findAndUpdateGameForPrevious}  =  require('./data_layer/datalayer.js');
const _layer = new Database()

//db.getCollection('games').find({over25validation: 'Passou',goalsScoredPlusConceded: {$gt: '2.5'}, "href" : "trends.asp?league=england"}).count()
//db.getCollection('games').find({over35validation: 'Passou',goalsScoredPlusConceded: {$gt: '2.5'}, "href" : "trends.asp?league=turkey", 'gameHistory.totalScore': {$gt: '2.5'}, }).count()
let sucess_query = function()
{


}