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
var analisaJogo = new EventEmitter();
var listJogosCondicao15 = [];
var listJogosCondicao25 = [];
var listJogosCondicao35 = [];



crawl()

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
            if (!linkLiga.includes("copalibertadores") && !linkLiga.includes("cleague") && !linkLiga.includes("uefa")) {
                linkLigaTrends = linkLiga.replace("latest", "trends");
                var game = new Game(tableGames[i].children[1].children[0].data.replace(/(\r\n|\n|\r)/gm, ""), tableGames[i + 1].children[1].children[0].data.replace(/(\r\n|\n|\r)/gm, ""), "", linkLigaTrends)
                console.log('game ', game)
                checkstatsGame(game);
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
                callback(("Error requesting data ", error))
            } else {
                //console.log('body is ', body)
                callback(game, body);
            }

        } else {
            // debugger;
            callback(("Error: read ECONNRESET", error.toString()))
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
        if (game.toString().includes("ECONNRESET")) {

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
                console.log("Linha 39-1,5:" + $($($($('table')[39]).children()[0]).children()[4]).children()[0].children[0].data)
                console.log("Linha 39-2,5:" + $($($($('table')[39]).children()[1]).children()[4]).children()[0].children[0].data)
                console.log("Linha 39-3,5:" + $($($($('table')[39]).children()[2]).children()[4]).children()[0].children[0].data)
                var over15 = $($($($('table')[39]).children()[0]).children()[4]).children()[0].children[0].data;
                var over25 = $($($($('table')[39]).children()[1]).children()[4]).children()[0].children[0].data;
                var over35 = $($($($('table')[39]).children()[2]).children()[4]).children()[0].children[0].data;
            } catch {
                console.log("Linha 43-1,5:" + $($($($('table')[45]).children()[0]).children()[4]).children()[0].children[0].data)
                console.log("Linha 43-2,5:" + $($($($('table')[45]).children()[1]).children()[4]).children()[0].children[0].data)
                console.log("Linha 43-3,5:" + $($($($('table')[45]).children()[2]).children()[4]).children()[0].children[0].data)
                var over15 = $($($($('table')[45]).children()[0]).children()[4]).children()[0].children[0].data;
                var over25 = $($($($('table')[45]).children()[1]).children()[4]).children()[0].children[0].data;
                var over35 = $($($($('table')[45]).children()[2]).children()[4]).children()[0].children[0].data;
            }
            game.ligaEstatisticas(over15.replace('%', ''), over25.replace('%', ''), over35.replace('%', ''));

            //problema - páginas como brazil 2 tem mais detalhes


            listaJogosAnalisados.data.push(game);
            analisaJogo.emit('processaJogoOver15', game);
        }
        numeroJogosDoDiaAnalisados.data = numeroJogosDoDiaAnalisados.data + 1;
        //numeroJogosDoDiaAnalisados.emit('update');
        //console.log('jogos acima de 15 ', listJogosCondicao15 )
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

analisaJogo.on('processaJogoOver15', function(game) {

    console.log('Jogo :  ', game.equipaCasa.nomeEquipa , ' - ', game.equipaFora.nomeEquipa  );
    console.log('totalHome15 ',game.equipaCasa.totalMatchGoalOver15, '  totalAway15 ',game.equipaFora.totalMatchGoalOver15);
    console.log('homeOver15 ',game.equipaCasa.homeMatchGoalOver15);
    console.log('awayOver15 ',game.equipaFora.homeMatchGoalOver15);


    console.log('==========================')
    console.log('==========================')



    //Percent increase = [(new value - original value)/original value] * 100
    let overPercentagemTotal15 = 0;
    let overPercentagemHome15 = 0;
    let overPercentagemAway15 = 0;

    //to do calcular a percentagem que passa a mais da media da liga para as 3 condições!

    //total da medida de golos total para over 15 tem de ser maior que a media da liga para a equipa da casa e a equipa fora.
    if(game.equipaCasa.totalMatchGoalOver15 >  game.over15 && game.equipaFora.totalMatchGoalOver15 > game.over15 )
    {
        //calcular o incremento de percentagem e arrendondar a duas casas
        overPercentagemTotal15 = Math.round( ((game.equipaCasa.totalMatchGoalOver15 - game.over15  ) / game.over15 ) * 100) / 100;
        if(game.equipaCasa.homeMatchGoalOver15 >= game.over15){
            overPercentagemHome15 = Math.round( ((game.equipaCasa.homeMatchGoalOver15 - game.over15  ) / game.over15 ) * 100) / 100;

            if(game.equipaFora.awayMatchGoalOver15 >= game.over15)
            {
                overPercentagemAway15 = Math.round( ((game.equipaFora.awayMatchGoalOver15 - game.over15  ) / game.over15 ) * 100) / 100;
                let media = (overPercentagemTotal15 + overPercentagemHome15 + overPercentagemAway15) / 3;
                game.percAcimaMedia = media;
                console.log(' $$$$ Jogo :  ', game.equipaCasa.nomeEquipa , ' - ', game.equipaFora.nomeEquipa , ' media acima ', media )
                listJogosCondicao15.push(game)
            }
        }
    }
});


numeroJogosDoDiaAnalisados.on('update', function () {
    console.log("Numero de jogos analisados:" + numeroJogosDoDiaAnalisados.data)
    console.log("Numero de lista de jogos:" + listaJogosAnalisados.data.length)
    console.log("Numero de jogos :" + numeroJogosDoDia.data)
    if (numeroJogosDoDiaAnalisados.data == numeroJogosDoDia.data) {
        let condicao1 = false;
        let condicao2 = false;
        let condicao3 = false;
        listaJogosCumpremCondicao.data = [];
        //para cada jogo/game
        for (let i = 0; i < listaJogosAnalisados.data.length; i++) {

            //Condição da equipa da casa ter média de golos superior à media de golos da liga
            if (listaJogosAnalisados.data[i].equipaCasa.totalMatchGoalOver15 >= listaJogosAnalisados.data[i].over15 && listaJogosAnalisados.data[i].equipaCasa.totalMatchGoalOver25 >= listaJogosAnalisados.data[i].over25 && listaJogosAnalisados.data[i].equipaCasa.totalMatchGoalOver35 >= listaJogosAnalisados.data[i].over35) {
                //A mesma coisa para a equipa que joga fora
                if (listaJogosAnalisados.data[i].equipaFora.totalMatchGoalOver15 >= listaJogosAnalisados.data[i].over15 && listaJogosAnalisados.data[i].equipaFora.totalMatchGoalOver25 >= listaJogosAnalisados.data[i].over25 && listaJogosAnalisados.data[i].equipaFora.totalMatchGoalOver35 >= listaJogosAnalisados.data[i].over35) {
                    condicao1 = true;
                }
            }
            //Condição da equipa da casa ter média de golos em jogos em casa superior à media de golos da liga
            if (listaJogosAnalisados.data[i].equipaCasa.homeMatchGoalOver15 >= listaJogosAnalisados.data[i].over15 && listaJogosAnalisados.data[i].equipaCasa.homeMatchGoalOver25 >= listaJogosAnalisados.data[i].over25 && listaJogosAnalisados.data[i].equipaCasa.homeMatchGoalOver35 >= listaJogosAnalisados.data[i].over35) {
                condicao2 = true;
            }
            //Condição da equipa de fora ter média de golos em jogos fora superior à media de golos da liga
            if (listaJogosAnalisados.data[i].equipaFora.awayMatchGoalOver15 >= listaJogosAnalisados.data[i].over15 && listaJogosAnalisados.data[i].equipaFora.awayMatchGoalOver25 >= listaJogosAnalisados.data[i].over25 && listaJogosAnalisados.data[i].equipaFora.awayMatchGoalOver35 >= listaJogosAnalisados.data[i].over35) {
                condicao3 = true;
            }

            if (condicao1 == true && condicao2 == true && condicao3 == true) {
                listaJogosCumpremCondicao.data.push(listaJogosAnalisados.data[i])
            }
        }
        debugger;

    }
});
