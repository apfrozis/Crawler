var request = require('request');
require('dotenv').config(); // load configurations
var cheerio = require('cheerio');
const Game = require('./structures/game');
const async = require('async');


var SITE_URL = "https://www.soccerstats.com/";
var DIA_JOGO = 0;
var PAGE_URL = "matches.asp?matchday="+DIA_JOGO;
var START_URL = SITE_URL + PAGE_URL;

//muda isto seu sacana....
var HREF = "trends.asp?league=egypt";

console.log('process.env.DATABASE_URL : ', process.env.DATABASE_URL)

var numeroJogosDoDia = 0;
var numeroJogosDoDiaAnalisados = 0;
var listaJogosCumpremCondicao = [];

//Import the mongoose module
var mongoose = require('mongoose');


//define and use new datalayer..
const Layer  =  require('./data_layer/datalayer.js');
const _layer = new Layer()





crawl();

function crawl() {
    numeroJogosDoDia = 0;
    numeroJogosDoDiaAnalisados = 0;
    numeroDeJogosComLigaNaoSuportada = 0;
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
                var today = new Date()
                today.setDate(today.getDate() + (DIA_JOGO-1));
                var nome_equipa_casa = tableGames[i].childNodes[0].data
                var nome_equipa_fora = tableGames[i+1].childNodes[0].data
                var resultado = 0
                try{
                    var golos_equipa_casa = $(tableGames[i].nextSibling.nextSibling).find('b')[0].childNodes[0].data
                    var golos_equipa_fora = $(tableGames[i+1].nextSibling.nextSibling).find('b')[0].childNodes[0].data
                    resultado = parseInt(golos_equipa_casa) + parseInt(golos_equipa_fora)
                }catch(e){
                    resultado = "Ainda não existe resultado para o presente jogo"
                }

                 //todo vviama
                 /*
                 1. Find do game pela key
                 2. calcular satisfaç\ao das condi~\oes de acordo com o resultado
                 3. guardar na bd
                 */


                 //alfonsinho
                 // arranjar o href dinmaci para calcular as keys....



                var game = {
                    equipaCasa : {
                        nomeEquipa : nome_equipa_casa
                    },
                    equipaFora : {
                        nomeEquipa : nome_equipa_fora
                    },
                    href : HREF,
                    gameHistory : {
                        totalScore : resultado,
                        homeTotalGoals : golos_equipa_casa,
                        awayTotalGoals : golos_equipa_fora,
                    }

                }

                _layer.findAndUpdateGame(game, (err, data) =>
                {
                    if (err){
                        console.error('Error save model');
                    }
                    else{
                        console.log('User saved successfully!');
                    }
                });

                console.log("Liga:", nomeLiga)
                console.log("Date:", today)
                console.log("Result:" + resultado)
                i+=2;
                callback ()

        },
        function (err){
            //if err faz merdas
            console.log("Numero de jogos que passam as 3 condições:" + listaJogosCumpremCondicao.length)
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
}
