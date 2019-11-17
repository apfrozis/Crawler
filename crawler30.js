var request = require('request');
var cheerio = require('cheerio');
const Game = require('./structures/game');
const Equipa = require('./structures/equipa');
const League = require('./structures/league');
var async = require('async');

var SITE_URL = "https://www.soccerstats.com/";
var PAGE_URL = "matches.asp?matchday=4";
var START_URL = SITE_URL + PAGE_URL;

var numeroJogosDoDia = 0;
var numeroJogosDoDiaAnalisados = 0;
var numeroDeJogosComRespostaComErro = 0;
var numeroDeJogosComLigaNaoSuportada = 0;
var listaJogosAnalisados = [];
var listaJogosCumpremCondicao = [];
var listaLigas = [];


var response;
var express = require('express');
var cors = require('cors');

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://heroku_6b7t2wg0:jo3rl5r1o5n5c5ltcfrt01ljud@ds345028.mlab.com:45028/heroku_6b7t2wg0';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

var GameModel = require('./data_layer/models/game')

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app.options('*', cors()) 

app.get('/getstats',cors(corsOptions), function (req, res) {
    console.log("recebeu request")
    response = res;
    crawl()
    //res.send([new Game('equipa 1', 'equipa 2', 'liga', 'href'),new Game('equipa 2', 'equipa 2', 'liga', 'href')]);

})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

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
                if (!linkLiga.includes("copalibertadores") && !linkLiga.includes("cleague") && !linkLiga.includes("uefa") && !linkLiga.includes("cup-england2") &&
                 !linkLiga.includes("euroqualw") && !linkLiga.includes("euroqual") && !linkLiga.includes("eurou21qual") && !linkLiga.includes("fifaqualasia") &&
                  !linkLiga.includes("eurou19qual")) {
                    linkLigaTrends = linkLiga.replace("latest", "trends");
                    var game = new Game(tableGames[i].childNodes[0].data.replace(/(\r\n|\n|\r)/gm, ""), tableGames[i + 1].childNodes[0].data.replace(/(\r\n|\n|\r)/gm, ""), nomeLiga, linkLigaTrends)
                    console.log("Vai iterar sobre o jogo ", game)
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
            //if err faz merdas
            console.log("Numero de jogos que passam as 3 condições:" + listaJogosCumpremCondicao.length)
            response.send(listaJogosCumpremCondicao);
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
        var gamemodel = new GameModel(game);
        gamemodel.save(function(err) {
            if (err) throw err;
            console.log('User saved successfully!');
        });
        listaJogosCumpremCondicao.push(game)
    }
        
        next();
       
    
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
         return {teste: 'Passou', desvioPadrao: desvioPadrao + " %"}
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
