var request = require('request');
require('dotenv').config(); // load configurations
var cheerio = require('cheerio');
const Game = require('./structures/game');
const Equipa = require('./structures/equipa');
const League = require('./structures/league');
const async = require('async');


var SITE_URL = "https://www.soccerstats.com/";
var DIA_JOGO = 1;
const LEAGUES_TO_IGNORE = ["copalibertadores","cleague","uefa","cup-england2","euroqualw",
"euroqual","eurou21qual","fifaqualasia","eurou19qual","cup-italy1","yleague","cup-france2",
"cup-spain2","cup-netherlands1","cup-belgium1","cup-turkey1","cup-england1","cup-spain1",
<<<<<<< HEAD
"cup-france1","cup-germany1","cup-portugal1", "cleague","afcchamp", "cup-cyprus1","cup-greece1",
"cup-denmark1","cup-czechrepublic1"]
=======
"cup-france1","cup-germany1","cup-portugal1", "cleague","afcchamp", "cup-cyprus1","cup-greece1", "cup-ukraine1"]
>>>>>>> a22d57807319e126a21aa822ab3734264a4fc042
var PAGE_URL = "matches.asp?matchday="+DIA_JOGO;
var START_URL = SITE_URL + PAGE_URL;

console.log('process.env.DATABASE_URL : ', process.env.DATABASE_URL)

var numeroJogosDoDia = 0;
var numeroJogosDoDiaAnalisados = 0;
var numeroDeJogosComRespostaComErro = 0;
var numeroDeJogosComLigaNaoSuportada = 0;
var listaJogosAnalisados = [];
var listaJogosCumpremCondicao = [];
var listaLigas = [];

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://heroku_6b7t2wg0:jo3rl5r1o5n5c5ltcfrt01ljud@ds345028.mlab.com:45028/heroku_6b7t2wg0';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;
var GameModel = require('./data_layer/models/game');


//define and use new datalayer..
const {Database,findAndUpdateGameForPrevious}  =  require('./data_layer/datalayer.js');
const _layer = new Database()


// setTimeout(function()
// {
//     let object = {
//         alg_date : new Date(),
//         alg_total_analisados : 99,
//         alg_total_passaram : 19
//     }
//     console.log('Vai criar um novo estados do alg');
//     _layer.findAndUpdateOrCreateStatsLog(object, (err, data) =>{
//         if(err){
//             console.error('Erro a guardar as statics ', err)
//         }
//     })

// }, 1000 * 3);



//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// crawl();

function crawl() {
    numeroJogosDoDia = 0;
    numeroJogosDoDiaAnalisados = 0;
    numeroDeJogosComRespostaComErro = 0;
    numeroDeJogosComLigaNaoSuportada = 0;
    listaJogosAnalisados = [];
    listaJogosCumpremCondicao = [];
    // New page we haven't visited
    visitPage(START_URL, null, function (gameNull, body) {
        // Parse the document body
        var $ = cheerio.load(body);

        var tableGames = $('#content').find('.steam')
        numeroJogosDoDia = tableGames.length / 2;
        var i = 0
        async.until(function(next){
            next(null,i>tableGames.length-2)
        }, function(callback){
                var $tableChild = $(tableGames[i]);
                var $ligaElemento = $($tableChild.parent().prevAll('.parent'))
                if ($ligaElemento.length == 0) {
                    $ligaElemento = $($tableChild.parent().prevAll().find('.parent'))
                }
                var nomeLiga = $ligaElemento.find('font')[0].childNodes[0].data + $ligaElemento.find('font')[1].firstChild.data;
                var linkLigaTrends = "";
                var linkLiga = $ligaElemento.find('a')[0].attribs.href
                if (!LEAGUES_TO_IGNORE.includes(linkLiga.split('=')[1])) {
                    linkLigaTrends = linkLiga.replace("latest", "trends");
                    var today = new Date()
                    today.setDate(today.getDate() + (DIA_JOGO-1));
                    var game = new Game(tableGames[i].childNodes[0].data.replace(/(\r\n|\n|\r)/gm, ""), tableGames[i + 1].childNodes[0].data.replace(/(\r\n|\n|\r)/gm, ""), nomeLiga, linkLigaTrends,today)
                    console.log("Vai iterar sobre o jogo ", game)
                    if($(tableGames[i]).siblings().find('.button').length==0){
                            //$('tr:contains("Stats")')[0].children[2]
                            //$($('tr:contains("Stats")')[0]).css('rowspan','2')
                        game.gameStatshref = $($('tr:contains("Stats")')[0]).css('rowspan','2')[0].children[2].children[1].attribs.href
                        if(!game.gameStatshref.includes(game.equipaCasa.nomeEquipa.split(' ')[0].toLowerCase())){
                            game.gameStatshref = undefined
                        }
                        i+=2;
                    }else{
                        game.gameStatshref = $(tableGames[i]).siblings().find('.button')[0].attribs.href
                    }
                    //command
                    //$($('#content').find('.steam')).siblings().find('.button')
                    checkstatsGame(game, function(err, data){
                        i+=2;
                        callback (err, data)
                    });
                }else{
                    i+=2;
                    console.log("Liga não suportada", linkLiga)
                    numeroDeJogosComLigaNaoSuportada += 1;
                    numeroJogosDoDiaAnalisados = numeroJogosDoDiaAnalisados + 1;
                    callback ()
                }
        },
        function (err){
            console.log("Numero de jogos analisados:" + numeroJogosDoDiaAnalisados)
            console.log("Numero de lista de jogos com resultados:" + listaJogosAnalisados.length)
            console.log("Numero de jogos com resposta com erro:" + numeroDeJogosComRespostaComErro)
            console.log("Numero de jogos com resposta com liga nao suportada:" + numeroDeJogosComLigaNaoSuportada)
            console.log("Numero de jogos :" + numeroJogosDoDia)
            debugger;
            //if err faz merdas
            //TODO Aplicar aqui uma chamada a uma tabela de resultados...
            console.log("Numero de jogos que passam as 3 condições:" + listaJogosCumpremCondicao.length)
            console.log("FINITOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            /** Correu tudo vou guardar as estatisticas na bd */
            let object = {
                alg_date : new Date(),
                alg_total_analisados : listaJogosAnalisados.length,
                alg_total_passaram : listaJogosCumpremCondicao.length
            }
            _layer.findAndUpdateOrCreateStatsLog(object, (err, data) =>{
                if(err){
                    console.error('Erro a guardar as statics ', err)
                }
            })

        })
    });
}

function checkstatsGame(game, next) {
    //Visit page of game

    //Se a liga já tiver sido analisada não é preciso fazer outro pedido
    let ligaAnalisada = verificarSeLigaJaFoiAnalisada(game)
    if(ligaAnalisada != null){
        preencherJogoComEstatisticasDaLiga(game,ligaAnalisada);
        listaJogosAnalisados.push(game);
        numeroJogosDoDiaAnalisados = numeroJogosDoDiaAnalisados + 1;
        aplicarALgoritmo(game,function(err, data){
            next()
        })
    }
else{
    visitPage(SITE_URL + game.href, game, function (game, body) {
        console.log("--------------------------Next game---------------------------")
        if (game.toString().includes("ECONNRESET") || game.toString().includes("Error")) {
            console.log("Jogo com resposta com erro")
            numeroDeJogosComRespostaComErro += 1;
            numeroJogosDoDiaAnalisados = numeroJogosDoDiaAnalisados + 1;
            next()
        } else {
            // Parse the document body
            var $ = cheerio.load(body);

            //new league not searched yet
            let league = new League(game.liga, game.href);

            var tableGamesStats = $('.sortable')

            //análise das 3 tabelas total/casa/fora
            for (var j = 0; j < tableGamesStats.length; j++) {
                var $tableStats = $($(tableGamesStats[j]).find('.trow8'))
                var equipaForaJogouForaEquipaCasaJogouCasa = 0;
                for (var i = 0; i < $tableStats.length; i++) {
                    try {
                        var teamName = $($($($tableStats[i]).children()[0]).children()[0])[0].children[0].data
                    } catch {
                        console.log("Deu merda - validar porque deu este problema")
                        debugger;
                    }
                  //  console.log("Nome da equipa na tabela:" + teamName)
                 //   console.log("Nome da equipa Casa:" + game.equipaCasa.nomeEquipa)
                  //  console.log("Nome da equipa Fora:" + game.equipaFora.nomeEquipa)
                    var equipaInfo = [];
                    if (game.equipaCasa.nomeEquipa == teamName) {

                        for (var f = 1; f < $($tableStats[i]).children().length; f++) {
                            try {
                                let estatisticaDaTabela = $($($tableStats[i]).children()[f]).find('span')[0].children[0].data
                                equipaInfo.push(estatisticaDaTabela.replace('%', ''))
                            } catch {
                                try {
                                    let estatisticaDaTabela = $($($tableStats[i]).children()[f]).find('b')[0].children[0].data
                                    equipaInfo.push(estatisticaDaTabela.replace('%', ''))
                                } catch {
                                    try {
                                        let estatisticaDaTabela = $($($tableStats[i]).children()[f]).find('font')[0].children[0].data
                                        equipaInfo.push(estatisticaDaTabela.replace('%', ''))
                                    } catch {
                                        debugger;
                                    }
                                }
                            }

                        }
                        equipaForaJogouForaEquipaCasaJogouCasa++;
                        colocarInformacaoEquipas(game.equipaCasa, j, equipaInfo);
                        league.addEquipa(game.equipaCasa)
                    } else if (game.equipaFora.nomeEquipa == teamName) {
                        var equipaInfo = [];
                        for (var f = 1; f < $($tableStats[i]).children().length; f++) {
                            try {
                                let estatisticaDaTabela = $($($tableStats[i]).children()[f]).find('span')[0].children[0].data
                                equipaInfo.push(estatisticaDaTabela.replace('%', ''))
                            } catch {
                                try {
                                    let estatisticaDaTabela = $($($tableStats[i]).children()[f]).find('b')[0].children[0].data
                                    equipaInfo.push(estatisticaDaTabela.replace('%', ''))
                                } catch {
                                    try {
                                        let estatisticaDaTabela = $($($tableStats[i]).children()[f]).find('font')[0].children[0].data
                                        equipaInfo.push(estatisticaDaTabela.replace('%', ''))
                                    } catch {
                                        debugger;
                                    }
                                }
                            }

                        }
                        equipaForaJogouForaEquipaCasaJogouCasa++;
                        colocarInformacaoEquipas(game.equipaFora, j, equipaInfo);
                        league.addEquipa(game.equipaFora)
                    }else{
                        var equipaInfo = [];
                        for (var f = 1; f < $($tableStats[i]).children().length; f++) {
                            try {
                                let estatisticaDaTabela = $($($tableStats[i]).children()[f]).find('span')[0].children[0].data
                                equipaInfo.push(estatisticaDaTabela.replace('%', ''))
                            } catch {
                                try {
                                    let estatisticaDaTabela = $($($tableStats[i]).children()[f]).find('b')[0].children[0].data
                                    equipaInfo.push(estatisticaDaTabela.replace('%', ''))
                                } catch {
                                    try {
                                        let estatisticaDaTabela = $($($tableStats[i]).children()[f]).find('font')[0].children[0].data
                                        equipaInfo.push(estatisticaDaTabela.replace('%', ''))
                                    } catch {
                                        debugger;
                                    }
                                }
                            }

                        }
                        if(j==0){
                            let equipa = new Equipa(teamName)
                            colocarInformacaoEquipas(equipa, j, equipaInfo);
                            league.addEquipa(equipa); 
                        }
                        else{
                            for(let g = 0 ; g < league.equipas.length; g++){
                                if(league.equipas[g].nomeEquipa == teamName){
                                    colocarInformacaoEquipas(league.equipas[g], j, equipaInfo);
                                }
                            }
                        }
                    }
                }
                if (equipaForaJogouForaEquipaCasaJogouCasa != 2)
                    game.semJogos = true;

            }
            /*var category = $('td').filter(function() {
                return $(this).text().trim().includes('Home wins:');
              });
            category[category.length-1]
            */

            console.log("Tabela liga:" + game.href)
            var over15 = $('td').filter(function() {
                return $(this).text().trim().includes('Home wins');
              });
            console.log('Over 15 is : ', over15, ' ');
              var over25 = $('td').filter(function() {
                return $(this).text().trim().includes('Draws');
              });
              var over35 = $('td').filter(function() {
                return $(this).text().trim().includes('Away wins:');
              });
              try{
              over15 = $(over15[over15.length-1].parent).find('b')[1].children[0].data
              over25 = $(over25[over25.length-1].parent).find('b')[1].children[0].data
              over35 = $(over35[over35.length-1].parent).find('b')[1].children[0].data
              }catch(e){
                  debugger;
              }
try{
            game.ligaEstatisticas(over15.replace('%', '').trim(), over25.replace('%', '').trim(), over35.replace('%', '').trim());
            league.ligaEstatisticas(over15.replace('%', '').trim(), over25.replace('%', '').trim(), over35.replace('%', '').trim());


            listaLigas.push(league)

            //problema - páginas como brazil 2 tem mais detalhes

            listaJogosAnalisados.push(game);
            numeroJogosDoDiaAnalisados = numeroJogosDoDiaAnalisados + 1;
            //numeroJogosDoDiaAnalisados.emit('update');
            aplicarALgoritmo(game,function(err, data){
                next()
            })
        }catch(e){
            numeroDeJogosComRespostaComErro += 1
            next()        }
        }

    });
}
}

function preencherJogoComEstatisticasDaLiga(game,ligaAnalisada){
    for (var i = 1; i < ligaAnalisada.equipas.length; i++) {
        if (game.equipaCasa.nomeEquipa == ligaAnalisada.equipas[i].nomeEquipa) {
            game.equipaCasa = ligaAnalisada.equipas[i];
        } else if (game.equipaFora.nomeEquipa == ligaAnalisada.equipas[i].nomeEquipa) {
            game.equipaFora = ligaAnalisada.equipas[i];
        }
    }
    game.ligaEstatisticas(ligaAnalisada.over15.replace('%', ''), ligaAnalisada.over25.replace('%', ''), ligaAnalisada.over35.replace('%', ''));
}

function verificarSeLigaJaFoiAnalisada(game) {
    for(let i = 0; i < listaLigas.length; i++){
        if(game.href==listaLigas[i].link){
            return listaLigas[i];
        }
    }
    return null;
}

function colocarInformacaoEquipas(equipa, j, equipaInfo) {
    if (j == 0)
        equipa.informacaoTotal(equipaInfo);
    else if (j == 1)
        equipa.informacaoCasa(equipaInfo);
    else if (j == 2)
        equipa.informacaoFora(equipaInfo);
}

function aplicarALgoritmo (game, next) {
    console.log("Numero de jogos analisados:" + numeroJogosDoDiaAnalisados)
    console.log("Numero de lista de jogos com resultados:" + listaJogosAnalisados.length)
    console.log("Numero de jogos com resposta com erro:" + numeroDeJogosComRespostaComErro)
    console.log("Numero de jogos com resposta com liga nao suportada:" + numeroDeJogosComLigaNaoSuportada)
    console.log("Numero de jogos :" + numeroJogosDoDia)
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
    if(over15Teste['teste']=='Passou'){
        game.over15validation = over15Teste['teste'];
        game.over15standardDeviation = over15Teste['desvioPadrao'];
    }
    if(over25Teste['teste']=='Passou'){
        game.over25validation = over25Teste['teste'];
        game.over25standardDeviation = over25Teste['desvioPadrao'];
    }
    if(over35Teste['teste']=='Passou'){
        game.over35validation = over35Teste['teste'];
        game.over35standardDeviation = over35Teste['desvioPadrao'];
    }
    
    if (over15Teste['teste']=='Passou'|| over25Teste['teste']=='Passou' || over35Teste['teste']=='Passou') {
        //todo
        statsForAlgorithmSecondFase(game, function(updatedGame){

            _layer.findAndUpdateOrCreateGame(updatedGame, (err, data) =>
            {
                if (err){
                    console.error('Error save model');
                }
                else{
                    console.log('User saved successfully!');
                }
            });
    
            // gamemodel.save(function(err) {
            //     if (err) throw err;
            //     console.log('User saved successfully!');
            // });
            listaJogosCumpremCondicao.push(game)
            next();
        })
    } else{
        next()
    }
        
        
       
    
}

function statsForAlgorithmSecondFase(game, next){
    if(game.gameStatshref!=undefined  && game.gameStatshref
        !='pmatch.asp?league=jamaica&stats=82-12-2-2020-molynes-united--vere-united-fc'){
    console.log("GOing to visit:"+SITE_URL + game.gameStatshref)
    visitPage(SITE_URL + game.gameStatshref, game, function (game, body) {
        if (body.toString().includes("ECONNRESET") || body.toString().includes("Error")) {
            console.log("Jogo com resposta com erro")
            next()
        } else {
            // Parse the document body
            var $ = cheerio.load(body);
            //$('.five').text('Goals scored per match')
            //$('.five').text('Goals conceded per match')//$('.seven').text('Goals scored per match')[0].parent.parentNode.parentNode.children[1].childNodes[1].children[3].children[0].data
            //$('.trow3') 42 e 43
            //$(this).text().trim().includes('Home wins');
            //$('tr.trow3:contains("goals scored per match")')
            //$('tr.trow3:contains("(in the league, most recent first)")').parent().siblings()[3].children[1].children[3]
            //$('tr.trow3:contains("(in the league, most recent first)")').parent().siblings()[3].children[1].children[7]
            try{
            let game_result_games = $($('tr.trow3:contains("(in the league, most recent first)")').parent().siblings()[3]).children('tr')
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
            debugger;
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
            game.goalsScoredPlusConceded= -1
        }
            next(game)
        }
    })
    }else{
        next(game)
    }

}

function algoritmoFantastico(game, equipaCasaLiga,equipaForaLiga,equipaCasaCasa,equipaForaFora,mediaLiga){
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
     if (condicao1 == true && condicao2 == true && condicao3 == true) {
         let mediaEquipas = parseInt((parseInt(equipaCasaLiga) + parseInt(equipaCasaCasa) + parseInt(equipaForaLiga) + parseInt(equipaForaFora))/4);
         let desvioPadrao = mediaEquipas - parseInt(mediaLiga);
         return {teste: 'Passou', desvioPadrao: desvioPadrao}
     }
     return {teste: 'Não passou'}
 }

function visitPage(url, game, callback) {
    // Make the request
    console.log("Visiting page " + url);
    request(url, function (error, response, body) {
        // Check status code (200 is HTTP OK)
        console.log("Received answer: " + response);
        console.log("Error: " + error);
        if (error == null) {

            //aqui nunca podes ter tipo isto
            // if(error){
            //     callback(a,b)
            // }
            // callback()
            // Se tiveres erro isto vai entrar dentro do if chamar o callback e depois mais a baixo vai chamar o callback de novo
            // vai chamar duas vezes o callback e vai rebentar-te com o codigo..

            if (response.statusCode !== 200) {
                console.log("Error:" + error);
                //senhor aluno quando dá erro tens de propogar o erro para a função acima, no node  por convenção é sempre o primeiro 
                //parametro no callback ou seja (err, data1, data2, .....)
                callback("Error requesting data", error)
            } else {
                //console.log('body is ', body)
                callback(game, body);
            }
        } else {
            // debugger;
            callback("Error: read ECONNRESET", error.toString())
        }
    });
}

module.exports.games = crawl;