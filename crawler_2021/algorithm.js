
var listaJogosCumpremCondicao = []
var SITE_URL = "https://www.soccerstats.com/";
var cheerio = require('cheerio');
const crawler_requests = require('./crawler_requests')

//define and use new datalayer..
const {Database,findAndUpdateGameForPrevious}  =  require('./../data_layer/datalayer.js');
const _layer = new Database()

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://benfica:benfica@wallid-cloud-db.gh225.mongodb.net/mega_bot?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function aplicarALgoritmo (game, next) {
    equipaCasaLigaOver15 = game.equipaCasa.totalMatchGoalOver15
    equipaForaLigaOver15 = game.equipaFora.totalMatchGoalOver15
    equipaCasaCasaOver15 = game.equipaCasa.homeMatchGoalOver15
    equipaForaForaOver15 = game.equipaFora.awayMatchGoalOver15
    mediaLiga15 = game.over15
    let over15Teste = algoritmoFantastico(game,equipaCasaLigaOver15,equipaForaLigaOver15,equipaCasaCasaOver15,equipaForaForaOver15,mediaLiga15)
    equipaCasaLigaOver25 = game.equipaCasa.totalMatchGoalOver25
    equipaForaLigaOver25 = game.equipaFora.totalMatchGoalOver25
    equipaCasaCasaOver25 = game.equipaCasa.homeMatchGoalOver25
    equipaForaForaOver25 = game.equipaFora.awayMatchGoalOver25
    mediaLiga25 = game.over25
    let over25Teste = algoritmoFantastico(game, equipaCasaLigaOver25,equipaForaLigaOver25,equipaCasaCasaOver25,equipaForaForaOver25,mediaLiga25)
    equipaCasaLigaOver35 = game.equipaCasa.totalMatchGoalOver35
    equipaForaLigaOver35 = game.equipaFora.totalMatchGoalOver35
    equipaCasaCasaOver35 = game.equipaCasa.homeMatchGoalOver35
    equipaForaForaOver35 = game.equipaFora.awayMatchGoalOver35
    mediaLiga35 = game.over35
    let over35Teste = algoritmoFantastico(game, equipaCasaLigaOver35,equipaForaLigaOver35,equipaCasaCasaOver35,equipaForaForaOver35,mediaLiga35)
    game.over15validation = over15Teste['teste'];
    game.over15standardDeviation = over15Teste['desvioPadrao'];
    game.over25validation = over25Teste['teste'];
    game.over25standardDeviation = over25Teste['desvioPadrao'];
    game.over35validation = over35Teste['teste'];
    game.over35standardDeviation = over35Teste['desvioPadrao'];
    
    //todo
    statsForAlgorithmSecondFase(game, function(updatedGame){
        // Guardar nalgum sítio
        listaJogosCumpremCondicao.push(game)
        _layer.findAndUpdateOrCreateGame(updatedGame, (err, data) =>
        {
            if (err){
                console.error('Error save model');
            }
            else{
                console.log('User saved successfully!');
            }
        });
        next();
    })
}

function statsForAlgorithmSecondFase(game, next){
    if(game.gameStatshref!=undefined){
        console.log("Going to visit:"+SITE_URL + game.gameStatshref)
        crawler_requests.visitPage(SITE_URL + game.gameStatshref, game, function (game, body, error) {
            var error = crawler_requests.dealWithErrorResponse(error)
            if (error) next()
            // Parse the document body
            var $ = cheerio.load(body);
            try{
                let game_result_games = $($('tr.trow3:contains("(in the league, most recent first)")').closest('table').siblings()[1]).find('tr')
                let home_goals_scored = 0
                let home_goals_conceded = 0
                let away_goals_scored = 0
                let away_goals_conceded = 0
                for(var i = 0 ; i < 4; i ++){
                    home_goals_scored = home_goals_scored + parseInt(game_result_games[i].children[3].children[0].children[0].children[0].data.split('-')[0].trim())
                    home_goals_conceded = home_goals_conceded + parseInt(game_result_games[i].children[3].children[0].children[0].children[0].data.split('-')[1].trim())
                    away_goals_scored = away_goals_scored + parseInt(game_result_games[i].children[7].children[0].children[0].children[0].data.split('-')[0].trim())
                    away_goals_conceded = away_goals_conceded + parseInt(game_result_games[i].children[7].children[0].children[0].children[0].data.split('-')[1].trim())
                }
                game.goalsScoredLast4GamesHome = parseFloat(home_goals_scored/4).toFixed(2)
                game.goalsConcededLast4GamesHome = parseFloat(home_goals_conceded/4).toFixed(2)
                game.goalsScoredLast4GamesAway = parseFloat(away_goals_scored/4).toFixed(2)
                game.goalsConcededLast4GamesAway = parseFloat(away_goals_conceded/4).toFixed(2)
                try {
                    game.equipaCasa.goalsScoredPerMatchHome = parseFloat($('tr.trow3:contains("goals scored per match")')[0].childNodes[2].children[0].data.trim())
                    game.equipaFora.goalsScoredPerMatchAway = parseFloat($('tr.trow3:contains("goals scored per match")')[1].childNodes[2].children[0].data.trim())
                    game.equipaFora.goalsConcededPerMatchAway = parseFloat($('tr.trow3:contains("goals conceded per match")')[0].childNodes[2].children[0].data.trim())
                    game.equipaCasa.goalsConcededPerMatchHome = parseFloat($('tr.trow3:contains("goals conceded per match")')[1].childNodes[2].children[0].data.trim())
                    game.goalsScoredPlusConceded = parseFloat((Math.min(game.equipaCasa.goalsScoredPerMatchHome, game.equipaFora.goalsConcededPerMatchAway) +
                                                    Math.min(game.equipaCasa.goalsConcededPerMatchHome, game.equipaFora.goalsScoredPerMatchAway)).toFixed(2));
                }catch(e){
                    debugger;
                }
            }catch(e){
                game.goalsScoredPlusConceded = -1
            }
                next(game)
        })
    }else{
        next(game)
    }

}

function algoritmoFantastico(game, equipaCasaLiga,equipaForaLiga,equipaCasaCasa,equipaForaFora,mediaLiga) {
    let condicao1 = false;
    let condicao2 = false;
    let condicao3 = false;
    //Condição da equipa da casa e fora ter média de golos superior à media de golos da liga
    if (parseInt(equipaCasaLiga) >= parseInt(mediaLiga) && parseInt(equipaForaLiga) >= parseInt(mediaLiga)) {
            condicao1 = true;
    }
    //Condição da equipa da casa ter média de golos em jogos em casa superior à media de golos da liga
    if (parseInt(equipaCasaCasa) >= parseInt(mediaLiga)) {
        condicao2 = true;
    }
    //Condição da equipa de fora ter média de golos em jogos fora superior à media de golos da liga
    if (parseInt(equipaForaFora) >= parseInt(mediaLiga)) {
        condicao3 = true;
    }
    let mediaEquipas = parseInt((parseInt(equipaCasaLiga) + parseInt(equipaCasaCasa) + parseInt(equipaForaLiga) + parseInt(equipaForaFora))/4);
    let desvioPadrao = mediaEquipas - parseInt(mediaLiga);
    if (condicao1 == true && condicao2 == true && condicao3 == true) {
        return {teste: true, desvioPadrao: desvioPadrao}
    }
    return {teste: false, desvioPadrao: desvioPadrao}
}

module.exports = { aplicarALgoritmo };