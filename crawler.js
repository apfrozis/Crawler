var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
const Game = require('./game');
const Equipa = require('./equipa');

var SITE_URL = "https://www.soccerstats.com/";
var PAGE_URL = "matches.asp?matchday=4"; //"matches.asp?matchday=1" ;
var START_URL = SITE_URL + PAGE_URL;


crawl()

function crawl() {

    // New page we haven't visited
    visitPage(START_URL, null, function (gameNull, body) {
        var games = [];
        // Parse the document body
        var $ = cheerio.load(body);


        //para aceder aquanda da pagina maches.tomorrow
        //var c = $('#content').children('div')[0].children[1].children[3].children[3].children[0].children[1].children
        var tableGames = $('#content').find('.trow8')

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
                games.push(game)
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
                callback( ("Error requesting data ", error))
            }
            else{
                //console.log('body is ', body)
                callback(game, body);
            }

        }


    });
    //nunca vai esperar porque o node corre sempre em single thread todas as chamadas sao assincronas
    //tens de fazer sempre o codigo todo na respostas do callback
    //console.log("Não esperou pela response do request")
}



function checkstatsGame(game) {
    //Visit page of game

    visitPage(SITE_URL + game.href, game, function (game, body) {
        // Parse the document body
        var $ = cheerio.load(body);

        //var c = $('#content').children('div')[0].children[1].children[3].children[3].children[0].children[1].children
        var tableGamesStats = $('.sortable')

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
                            equipaInfo.push($($($($tableStats[i]).children()[f]).children()[0])[0].children[0].data)

                        } catch {
                            try {
                                equipaInfo.push($($($($tableStats[i]).children()[f]).children()[0])[0].children[0].children[0].data)
                            } catch {
                                debugger;
                            }
                        }

                    }

                    equipaForaJogouForaEquipaCasaJogouCasa++;
                    colocarInformacaoEquipas(game.equipaCasa, j, equipaInfo);


                } else if (game.equipaFora.nomeEquipa == teamName) {
                    var equipaInfo = [];
                    for (var f = 1; f < $($tableStats[i]).children().length; f++) {
                        try {
                            equipaInfo.push($($($($tableStats[i]).children()[f]).children()[0])[0].children[0].data)

                        } catch {
                            try {
                                equipaInfo.push($($($($tableStats[i]).children()[f]).children()[0])[0].children[0].children[0].data)
                            } catch {
                                debugger;
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
