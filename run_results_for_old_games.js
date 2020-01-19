require('dotenv').config(); // load configurations
const _async = require('async');


console.log('process.env.DATABASE_URL : ', process.env.DATABASE_URL)


//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://heroku_6b7t2wg0:jo3rl5r1o5n5c5ltcfrt01ljud@ds345028.mlab.com:45028/heroku_6b7t2wg0';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//defindae and use new datalayer..
const {Database,findAndUpdateGameForPrevious}  =  require('./data_layer/datalayer.js');
const _layer = new Database()

let iterator_through_docs = function(docs, next){
    let i = 0;
    _async.until(function(next){
        next(null,i>docs.length-1)
    }, function(callback){
        let prevGame = docs[i];
        if(prevGame.game_key == 'spain5_orihuela_sdejea_302020'){
            debugger;
        }
                //console.log('saved game ', prevSavedGame[i] && prevSavedGame[i].gameHistory, "game History: " ,prevSavedGame[i].gameHistory)
                if(!prevGame.gameHistory.totalScore){
                    prevGame.gameHistory.satify15 = 'undefined';
                    //preencher para 2.5
                    prevGame.gameHistory.satify25 = 'undefined';
                    //preencher para 3.5
                    prevGame.gameHistory.satify35 = 'undefined';

                }
                
                if(prevGame && prevGame.gameHistory.totalScore){
                //preencher para 1.5
                prevGame.gameHistory.satify15 = prevGame.over15standardDeviation && prevGame.gameHistory.totalScore > 1.5;
                //preencher para 2.5
                prevGame.gameHistory.satify25 = prevGame.over25standardDeviation && prevGame.gameHistory.totalScore > 2.5;
                //preencher para 3.5
                prevGame.gameHistory.satify35 = prevGame.over35standardDeviation && prevGame.gameHistory.totalScore > 3.5;
                }
            let doc = _layer.findAndUpdateGame(prevGame,true, function(){
                i++
                callback()
            })
            
    },
    function (err){
        //if err faz merdas
        console.log(i)
        console.log("FIm:")
        next(null,null)
    })
}

let func_test = async function () {
    _async.waterfall([
        function(next)
        {
            _layer.findGameByCriteria({}, (err, data) =>
            {
                next(err, data);
            });

        },
        function(prevSavedGame, next)
        {
            iterator_through_docs(prevSavedGame,next);
        
        console.log("Length prevgame:" + prevSavedGame.length)

        },

    ], function(err, data) {
            debugger;
            return '';
    });

}

//example of save values
setTimeout(function() {

    let c = func_test()

}, 1000 * 5)




//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



function findGameSavedAndSetResult(game, next)
{


}



