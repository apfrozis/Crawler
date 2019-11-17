var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
const Game = require('./structures/game');
const Equipa = require('./structures/equipa');
var async = require('async');

var SITE_URL = "https://www.soccerstats.com/";
var PAGE_URL = "matches.asp?matchday=2"; //"matches.asp?matchday=1" ;
var START_URL = SITE_URL + PAGE_URL;

var numeroJogosDoDia = 0;
var numeroJogosDoDiaAnalisados = 0;
var numeroDeJogosComRespostaComErro = 0;
var numeroDeJogosComLigaNaoSuportada = 0;
var listaJogosAnalisados = [];
var response;
var listaJogosCumpremCondicao = [];

var express = require('express');
var cors = require('cors');



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


        //para aceder aquanda da pagina maches.tomorrow
        //var c = $('#content').children('div')[0].children[1].children[3].children[3].children[0].children[1].children
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
                !linkLiga.includes("euroqualw") && !linkLiga.includes("euroqual") && !linkLiga.includes("eurou21qual") && !linkLiga.includes("fifaqualasia")) {
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
            debugger;
            response.send(listaJogosCumpremCondicao);
        })
    });
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
    //nunca vai esperar porque o node corre sempre em single thread todas as chamadas sao assincronas
    //tens de fazer sempre o codigo todo na respostas do callback
    //console.log("Não esperou pela response do request")
}



function checkstatsGame(game, next) {
    //Visit page of game

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

            //var c = $('#content').children('div')[0].children[1].children[3].children[3].children[0].children[1].children
            var tableGamesStats = $('.sortable')
            //análise das 3 tabelas total/casa/fora
            for (var j = 0; j < tableGamesStats.length; j++) {
                var $tableStats = $($(tableGamesStats[j]).find('.trow8'))
                var equipaForaJogouForaEquipaCasaJogouCasa = 0;
                for (var i = 1; i < $tableStats.length - 1; i++) {
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
                        //falta ciclo que corre pelas tds

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

                    }
                }
                if (equipaForaJogouForaEquipaCasaJogouCasa != 2)
                    game.semJogos = true;

            }
            //ir buscar as estatisticas da liga (tabela no fim da página)
            //$('table')[38][7]
            //$('table')[43][1][7]
            //$('table')[43][3][7]
            //$('table')[43][5][7]
            console.log("Tabela liga:" + game.href)
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
              over15 = $(over15[over15.length-1].next.next).find('b')[0].children[0].data
              over25 = $(over25[over25.length-1].next.next).find('b')[0].children[0].data
              over35 = $(over35[over35.length-1].next.next).find('b')[0].children[0].data
              }catch(e){
                  debugger;
              }

            game.ligaEstatisticas(over15.replace('%', ''), over25.replace('%', ''), over35.replace('%', ''));

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
    equipaForaForaOver15 = game.equipaCasa.homeMatchGoalOver15
    mediaLiga15 = game.over15
    let over15Teste = algoritmoFantastico(equipaCasaLigaOver15,equipaForaLigaOver15,equipaCasaCasaOver15,equipaForaForaOver15,mediaLiga15)
    equipaCasaLigaOver25 = game.equipaCasa.totalMatchGoalOver25
    equipaForaLigaOver25 = game.equipaFora.totalMatchGoalOver25
    equipaCasaCasaOver25 = game.equipaCasa.homeMatchGoalOver25
    equipaForaForaOver25 = game.equipaCasa.homeMatchGoalOver25
    mediaLiga25 = game.over25
    let over25Teste = algoritmoFantastico(equipaCasaLigaOver25,equipaForaLigaOver25,equipaCasaCasaOver25,equipaForaForaOver25,mediaLiga25)
    equipaCasaLigaOver35 = game.equipaCasa.totalMatchGoalOver35
    equipaForaLigaOver35 = game.equipaFora.totalMatchGoalOver35
    equipaCasaCasaOver35 = game.equipaCasa.homeMatchGoalOver35
    equipaForaForaOver35 = game.equipaCasa.homeMatchGoalOver35
    mediaLiga35 = game.over35
    let over35Teste = algoritmoFantastico(equipaCasaLigaOver35,equipaForaLigaOver35,equipaCasaCasaOver35,equipaForaForaOver35,mediaLiga35)
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
        listaJogosCumpremCondicao.push(game)
    }
        
        next();
       
    
}

function algoritmoFantastico(equipaCasaLiga,equipaForaLiga,equipaCasaCasa,equipaForaFora,mediaLiga){
    let condicao1 = false;
     let condicao2 = false;
     let condicao3 = false;
     //Condição da equipa da casa e fora ter média de golos superior à media de golos da liga
     if (equipaCasaLiga >= mediaLiga && equipaForaLiga >= mediaLiga) {
             condicao1 = true;
     }
     //Condição da equipa da casa ter média de golos em jogos em casa superior à media de golos da liga
     if (equipaCasaCasa >= mediaLiga) {
         condicao2 = true;
     }
     //Condição da equipa de fora ter média de golos em jogos fora superior à media de golos da liga
     if (equipaForaFora >= mediaLiga) {
         condicao3 = true;
     }
 
     if (condicao1 == true && condicao2 == true && condicao3 == true) {
         let mediaEquipas = parseInt((parseInt(equipaCasaLiga) + parseInt(equipaCasaCasa) + parseInt(equipaForaLiga) + parseInt(equipaForaFora))/4);
         let desvioPadrao = mediaEquipas - mediaLiga;
         debugger;
         return {teste: 'Passou', desvioPadrao: desvioPadrao + " %"}
     }
     return {teste: 'Não passou'}
 }
