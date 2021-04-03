
require('dotenv').config(); // load configurations
var cheerio = require('cheerio');
const Game = require('../structures/game');
const async = require('async');
const safe = require('safe-navigator');
const crawler_requests = require('./crawler_requests')
const game_statistics_methods = require('./game_statistics_methods')
 
var SITE_URL = "https://www.soccerstats.com/";
var DIA_JOGO = 2;
const LEAGUES_TO_IGNORE = ["copalibertadores","cleague","uefa","cup-england2","euroqualw",
"euroqual","eurou21qual","fifaqualasia","eurou19qual","cup-italy1","yleague","cup-france2",
"cup-spain2","cup-netherlands1","cup-belgium1","cup-turkey1","cup-england1","cup-spain1",
"cup-france1","cup-germany1","cup-portugal1", "cleague","afcchamp", "cup-cyprus1","cup-greece1",
"cup-denmark1","cup-czechrepublic1", "cup-ukraine1", "fifaqual"]
var PAGE_URL = "matches.asp?matchday="+DIA_JOGO;
var START_URL = SITE_URL + PAGE_URL;
 
var numeroJogos = 0;
var listaJogosAnalisados = [];
var listaJogosCumpremCondicao = [];
var listaLigas = [];
  
crawl();

function crawl() {
    numeroJogos = 0;
    // New page we haven't visited
    crawler_requests.visitPage(START_URL, null, function (gameNull, body) {
        // Parse the document body
        var $ = cheerio.load(body);
        var tableGames = $('#content').find('.steam')
        numeroJogos = tableGames.length / 2;
        var all_games_index = 0
        var all_games_with_game_page_index = 0
        async.until(function(next){
            next(null,all_games_index>tableGames.length-2)
        }, function(callback){
            var $tableChild = $(tableGames[all_games_index]);
            var $ligaElemento = $($tableChild.parent().prevAll('.parent'))
            if ($ligaElemento.length == 0) {
                $ligaElemento = $($tableChild.parent().prevAll().find('.parent'))
            }
            var nomeLiga = $ligaElemento.find('font')[0].childNodes[0].data + (safe($ligaElemento.find('font')[1], 'firstChild.data') || '');
            var linkLigaTrends = "";
            var linkLiga = $ligaElemento.find('a')[0].attribs.href
            if (!LEAGUES_TO_IGNORE.includes(linkLiga.split('=')[1]) && !linkLiga.includes('cup') && !linkLiga.includes('fifa') && !linkLiga.includes('friend') && !linkLiga.includes('euro') && !linkLiga.includes('cleague')) {
                linkLigaTrends = linkLiga.replace("latest", "trends");
                var today = new Date()
                today.setDate(today.getDate() + (DIA_JOGO-1));
                var game = new Game(tableGames[all_games_index].childNodes[0].data.replace(/(\r\n|\n|\r)/gm, ""), tableGames[all_games_index + 1].childNodes[0].data.replace(/(\r\n|\n|\r)/gm, ""), nomeLiga, linkLigaTrends,today)

                try {
                game.gameStatshref = $('td[rowspan=2]').find('.vsmall')[all_games_with_game_page_index].attribs.href
                all_games_with_game_page_index += 1
                } catch(e){
                    debugger;
                }
                if(!game.gameStatshref.includes(game.equipaCasa.nomeEquipa.split(' ')[0].toLowerCase())){
                    all_games_with_game_page_index -= 1
                    game.gameStatshref = undefined
                }
                game_statistics_methods.checkstatsGame(game, function(err, data){
                    all_games_index += 2;
                    callback (err, data)
                });
            }else{
                all_games_index+=2;
                console.log("Liga não suportada", linkLiga)
                callback ()
            }
        },
        function (err, data){
            debugger;
            console.log("FINITOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        })
    });
}