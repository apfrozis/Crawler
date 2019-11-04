var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
const Game = require('./game');
const Equipa = require('./equipa');

var SITE_URL = "https://www.soccerstats.com/";
var PAGE_URL = "matches.asp?matchday=2"; //"matches.asp?matchday=1" ;
var START_URL = SITE_URL + PAGE_URL;

var EventEmitter = require("events").EventEmitter;
var numeroJogosDoDia = new EventEmitter();
var numeroJogosDoDiaAnalisados = new EventEmitter();
var listaJogosAnalisados = new EventEmitter();
var listaJogosCumpremCondicao = new EventEmitter();
var response;


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

    // New page we haven't visited
    visitPage(START_URL, null, function (gameNull, body) {
        listaJogosAnalisados.data = [];
        // Parse the document body
        var $ = cheerio.load(body);


        //para aceder aquanda da pagina maches.tomorrow
        //var c = $('#content').children('div')[0].children[1].children[3].children[3].children[0].children[1].children
        var tableGames = $('#content').find('.trow8')
        numeroJogosDoDia.data = tableGames.length / 2;
        numeroJogosDoDiaAnalisados.data = 0;
        console.log("Numero de jogos:" + numeroJogosDoDia.data)
        for (var i = 0; i < tableGames.length; i++) {
            var $tableChild = $(tableGames[i]);
            var $ligaElemento = $($tableChild.prevAll('.parent'))
            if ($ligaElemento.length == 0) {
                $ligaElemento = $($tableChild.prevAll().find('.parent'))
            }
            var linkLigaTrends = "";
            var linkLiga = $ligaElemento.find('a')[0].attribs.href
            if (!linkLiga.includes("copalibertadores") && !linkLiga.includes("cleague") && !linkLiga.includes("uefa") && !linkLiga.includes("cup-england2")) {
                linkLigaTrends = linkLiga.replace("latest", "trends");
                nomeLiga = linkLiga.substring(18, linkLiga.length).replace(/[0-9]/g, "")
                var game = new Game(tableGames[i].children[1].children[0].data.replace(/(\r\n|\n|\r)/gm, ""), tableGames[i + 1].children[1].children[0].data.replace(/(\r\n|\n|\r)/gm, ""), nomeLiga, linkLigaTrends)
                console.log('game ', game)
                checkstatsGame(game);
            }else{
                numeroJogosDoDiaAnalisados.data = numeroJogosDoDiaAnalisados.data + 1;
            }


            i++;

        }
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



function checkstatsGame(game) {
    //Visit page of game

    visitPage(SITE_URL + game.href, game, function (game, body) {
        console.log("--------------------------Next game---------------------------")
        if (game.toString().includes("ECONNRESET") || game.toString().includes("Error")) {

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
                    console.log("Nome da equipa na tabela:" + teamName)
                    console.log("Nome da equipa Casa:" + game.equipaCasa.nomeEquipa)
                    console.log("Nome da equipa Fora:" + game.equipaFora.nomeEquipa)
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
            var over15 = "";
            var over25 = "";
            var over35 = "";
            try {
                console.log("Table 46-1,5:" + $($($($('table')[46])[0])[0]).find('b')[1].children[0].data)
                console.log("Table 46-2,5:" + $($($($('table')[46])[0])[0]).find('b')[3].children[0].data)
                console.log("Table 46-3,5:" + $($($($('table')[46])[0])[0]).find('b')[5].children[0].data)
                var over15 = $($($($('table')[46])[0])[0]).find('b')[1].children[0].data;
                var over25 = $($($($('table')[46])[0])[0]).find('b')[3].children[0].data;
                var over35 = $($($($('table')[46])[0])[0]).find('b')[5].children[0].data;
            } catch {
                try{
                console.log("Linha 43-1,5:" + $($($($('table')[40])[0])[0]).find('b')[1].children[0].data)
                console.log("Linha 43-2,5:" + $($($($('table')[40])[0])[0]).find('b')[3].children[0].data)
                console.log("Linha 43-3,5:" + $($($($('table')[40])[0])[0]).find('b')[5].children[0].data)
                var over15 = $($($($('table')[40])[0])[0]).find('b')[1].children[0].data;
                var over25 = $($($($('table')[40])[0])[0]).find('b')[3].children[0].data;
                var over35 = $($($($('table')[40])[0])[0]).find('b')[5].children[0].data;
                }
                catch{
                   // debugger;
                }
            }
            game.ligaEstatisticas(over15.replace('%', ''), over25.replace('%', ''), over35.replace('%', ''));

            //problema - páginas como brazil 2 tem mais detalhes


            listaJogosAnalisados.data.push(game);
        }
        numeroJogosDoDiaAnalisados.data = numeroJogosDoDiaAnalisados.data + 1;
        numeroJogosDoDiaAnalisados.emit('update');
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
numeroJogosDoDiaAnalisados.on('update', function () {
    console.log("Numero de jogos analisados:" + numeroJogosDoDiaAnalisados.data)
    console.log("Numero de lista de jogos com resultados:" + listaJogosAnalisados.data.length)
    console.log("Numero de jogos :" + numeroJogosDoDia.data)
    if (numeroJogosDoDiaAnalisados.data == numeroJogosDoDia.data) {

        listaJogosCumpremCondicao.data = [];
        //para cada jogo/game
        for (let i = 0; i < listaJogosAnalisados.data.length; i++) {
            equipaCasaLigaOver15 = listaJogosAnalisados.data[i].equipaCasa.totalMatchGoalOver15
            equipaForaLigaOver15 = listaJogosAnalisados.data[i].equipaFora.totalMatchGoalOver15
            equipaCasaCasaOver15 = listaJogosAnalisados.data[i].equipaCasa.homeMatchGoalOver15
            equipaForaForaOver15 = listaJogosAnalisados.data[i].equipaCasa.homeMatchGoalOver15
            mediaLiga15 = listaJogosAnalisados.data[i].over15
            let primeiroTeste = algoritmoFantastico(equipaCasaLigaOver15,equipaForaLigaOver15,equipaCasaCasaOver15,equipaForaForaOver15,mediaLiga15)
            equipaCasaLigaOver25 = listaJogosAnalisados.data[i].equipaCasa.totalMatchGoalOver25
            equipaForaLigaOver25 = listaJogosAnalisados.data[i].equipaFora.totalMatchGoalOver25
            equipaCasaCasaOver25 = listaJogosAnalisados.data[i].equipaCasa.homeMatchGoalOver25
            equipaForaForaOver25 = listaJogosAnalisados.data[i].equipaCasa.homeMatchGoalOver25
            mediaLiga25 = listaJogosAnalisados.data[i].over25
            let segundoTeste = algoritmoFantastico(equipaCasaLigaOver25,equipaForaLigaOver25,equipaCasaCasaOver25,equipaForaForaOver25,mediaLiga25)
            equipaCasaLigaOver35 = listaJogosAnalisados.data[i].equipaCasa.totalMatchGoalOver35
            equipaForaLigaOver35 = listaJogosAnalisados.data[i].equipaFora.totalMatchGoalOver35
            equipaCasaCasaOver35 = listaJogosAnalisados.data[i].equipaCasa.homeMatchGoalOver35
            equipaForaForaOver35 = listaJogosAnalisados.data[i].equipaCasa.homeMatchGoalOver35
            mediaLiga35 = listaJogosAnalisados.data[i].over35
            let terceiroTeste = algoritmoFantastico(equipaCasaLigaOver35,equipaForaLigaOver35,equipaCasaCasaOver35,equipaForaForaOver35,mediaLiga35)
            if(primeiroTeste)
                listaJogosAnalisados.data[i].over15validation = true;
            if(segundoTeste)
                listaJogosAnalisados.data[i].over25validation = true;
            if(terceiroTeste)
                listaJogosAnalisados.data[i].over35validation = true;

            if (primeiroTeste == true|| segundoTeste == true || terceiroTeste == true) {
                listaJogosCumpremCondicao.data.push(listaJogosAnalisados.data[i])
            }
        }
       response.send(listaJogosCumpremCondicao.data);
    }
});

function algoritmoFantastico(equipaCasaLiga,equipaForaLiga,equipaCasaCasa,equipaForaFora,mediaLiga){
    let condicao1 = false;
    let condicao2 = false;
    let condicao3 = false;
    //Condição da equipa da casa ter média de golos superior à media de golos da liga
    if (equipaCasaLiga >= mediaLiga) {
        //A mesma coisa para a equipa que joga fora
        if (equipaForaLiga >= mediaLiga) {
            condicao1 = true;
        }
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
        return true
    }
    return false
}
