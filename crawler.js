var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
const Game = require('./game');
const Equipa = require('./equipa');

var SITE_URL = "https://www.soccerstats.com/";
var PAGE_URL = "matches.asp?matchday=4"; //"matches.asp?matchday=1" ;
var START_URL = SITE_URL + PAGE_URL;


crawl().then(function (games) {
    debugger;

});

debugger;

async function crawl() {

    // New page we haven't visited
    var games = await visitPage(START_URL, null, function (gameNull, body) {

        // Parse the document body
        var $ = cheerio.load(body);
        var games = [];

        //para aceder aquanda da pagina maches.tomorrow
        //var c = $('#content').children('div')[0].children[1].children[3].children[3].children[0].children[1].children
        var tableGames = $('#content').find('.trow8')

        for (var i = 0; i < tableGames.length; i++) {
            var $tableChild = $(tableGames[i]);
            var $ligaElemento = $($tableChild.prevAll('.trow2'))
            if ($ligaElemento.length == 0) {
                $ligaElemento = $($tableChild.prevAll().find('.trow2'))
            }
            var linkLigaTrends = "";
            var linkLiga = $ligaElemento.find('a')[0].attribs.href
            if (!linkLiga.includes("copalibertadores") && !linkLiga.includes("cleague") && !linkLiga.includes("uefa")) {
                linkLigaTrends = linkLiga.replace("latest", "trends");
                var game = new Game(tableGames[i].children[1].children[0].data.replace(/(\r\n|\n|\r)/gm, ""), tableGames[i + 1].children[1].children[0].data.replace(/(\r\n|\n|\r)/gm, ""), "", linkLigaTrends)
                games.push(game)
                debugger;
                // checkstatsGame(game);
            }


            i++;

        }
        return Promise.all();
    });
    return Promise.all();
}

async function visitPage(url, game, callback) {

    // Make the request
    console.log("Visiting page " + url);
    request(url, function (error, response, body) {
        // Check status code (200 is HTTP OK)
        console.log("Received answer: " + response);
        console.log("Error: " + error);
        if (error == null) {
            if (response.statusCode !== 200) {
                console.log("Error:" + error);
                return;
            }

            callback(game, body);
        }


    });
}



function checkstatsGame(game) {
    //Visit page of game

    visitPage(SITE_URL + game.href, game, function (game, body) {
        // Parse the document body
        var $ = cheerio.load(body);

        //var c = $('#content').children('div')[0].children[1].children[3].children[3].children[0].children[1].children
        var tableGamesStats = $($($('.eight')[0]).children()[0]).find('table')

        for (var j = 0; j < tableGamesStats.length; j++) {
            var $tableStats = $($(tableGamesStats[j]).find('.trow8'))
            var equipaForaJogouForaEquipaCasaJogouCasa = 0;
            for (var i = 1; i < $tableStats.length - 1; i++) {
                try {
                    var teamName = $($($($tableStats[i]).children()[0]).children()[0])[0].children[0].data
                } catch {
                    debugger;
                }
                console.log("Nome da equipa na tabela:" + teamName)
                console.log("Nome da equipa Casa:" + game.equipaCasa.nomeEquipa)
                console.log("Nome da equipa Fora:" + game.equipaFora.nomeEquipa)
                var equipaInfo = [];
                if (game.equipaCasa.nomeEquipa == teamName) {
                    //falta ciclo que corre pelas tds

                    for (var f = 1; f < $($tableStats[i]).children().length; f++) {
                        if (f == 2 || f == 5) {
                            equipaInfo.push($($($($tableStats[i]).children()[f]).children()[0])[0].children[0].children[0].data)
                        } else {
                            equipaInfo.push($($($($tableStats[i]).children()[f]).children()[0])[0].children[0].data)
                        }

                    }

                    equipaForaJogouForaEquipaCasaJogouCasa++;
                    colocarInformacaoEquipas(game.equipaCasa, j, equipaInfo);


                } else if (game.equipaFora.nomeEquipa == teamName) {
                    var equipaInfo = [];
                    for (var f = 1; f < $($tableStats[i]).children().length; f++) {
                        if (f == 2 || f == 5) {
                            equipaInfo.push($($($($tableStats[i]).children()[f]).children()[0])[0].children[0].children[0].data)
                        } else {
                            equipaInfo.push($($($($tableStats[i]).children()[f]).children()[0])[0].children[0].data)
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
