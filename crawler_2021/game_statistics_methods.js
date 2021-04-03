var listaJogosAnalisados = []
var listaLigas = []
var SITE_URL = "https://www.soccerstats.com/";
var cheerio = require('cheerio');
const algorithm = require('./algorithm')
const crawler_requests = require('./crawler_requests')
const League = require('../structures/league');
const Equipa = require('../structures/equipa');

function checkstatsGame(game, next) {
    //Visit page of game
    //Se a liga já tiver sido analisada não é preciso fazer outro pedido
    let ligaAnalisada = verificarSeLigaJaFoiAnalisada(game)
    if(ligaAnalisada != null){
        preencherJogoComEstatisticasDaLiga(game, ligaAnalisada);
        algorithm.aplicarALgoritmo(game,function(err, data){
            next()
        })
    }
    else {
        crawler_requests.visitPage(SITE_URL + game.href, game, function (game, body, error) {
            console.log("--------------------------Next game---------------------------")
            crawler_requests.dealWithErrorResponse(error)
            // Parse the document body
            var $ = cheerio.load(body);
            
            //new league not searched yet
            let league = new League(game.liga, game.href);

            var tableGamesStats = $('#btable.sortable')

            //análise das 3 tabelas total/casa/fora
            for (var leagueTableIndex = 0; leagueTableIndex < tableGamesStats.length; leagueTableIndex++) {
                var $tableStats = $($(tableGamesStats[leagueTableIndex]).find('.odd'))
                var equipaForaJogouForaEquipaCasaJogouCasa = 0;
                for (var teams_index = 0; teams_index < $tableStats.length; teams_index++) {
                    try {
                        var teamName = $($($($tableStats[teams_index]).children()[0]).children()[0])[0].children[0].data
                    } catch {
                        console.log("Deu merda - validar porque deu este problema")
                        debugger;
                    }
                    //  console.log("Nome da equipa na tabela:" + teamName)
                    //   console.log("Nome da equipa Casa:" + game.equipaCasa.nomeEquipa)
                    //  console.log("Nome da equipa Fora:" + game.equipaFora.nomeEquipa)
                    var equipaInfo = [];
                    if (game.equipaCasa.nomeEquipa == teamName) {
                        equipaInfo = fetchTeamInfo($, $($tableStats[teams_index]))
                        equipaForaJogouForaEquipaCasaJogouCasa++;
                        colocarInformacaoEquipas(game.equipaCasa, leagueTableIndex, equipaInfo);
                        league.addEquipa(game.equipaCasa)
                    } else if (game.equipaFora.nomeEquipa == teamName) {
                        equipaInfo = fetchTeamInfo($, $($tableStats[teams_index]))
                        equipaForaJogouForaEquipaCasaJogouCasa++;
                        colocarInformacaoEquipas(game.equipaFora, leagueTableIndex, equipaInfo);
                        league.addEquipa(game.equipaFora)
                    }else { // Recolhemos toda a informação da liga para não ter de fazer novo pedido em outro jogo da mesma liga
                        equipaInfo = fetchTeamInfo($, $($tableStats[teams_index]))
                        if(leagueTableIndex==0) { // Quando a tabela é a do total da liga
                            let equipa = new Equipa(teamName)
                            colocarInformacaoEquipas(equipa, leagueTableIndex, equipaInfo);
                            league.addEquipa(equipa); 
                        }
                        else { // Quando a tabela é uma das restantes então já criámos a equipa pois já passámos no primeiro if. Aqui só temos de encontrar a equipa e acrescentar a info
                            for(let g = 0 ; g < league.equipas.length; g++){
                                if(league.equipas[g].nomeEquipa == teamName){
                                    colocarInformacaoEquipas(league.equipas[g], leagueTableIndex, equipaInfo);
                                }
                            }
                        }
                    }
                }
                if (equipaForaJogouForaEquipaCasaJogouCasa != 2)
                    game.semJogos = true;
            }
            console.log("Tabela liga:" + game.href)
            var leagueStatistics = fetchLeagueGoalsAverage($)
            game.ligaEstatisticas(leagueStatistics[0].replace('%', '').trim(), leagueStatistics[1].replace('%', '').trim(), leagueStatistics[2].replace('%', '').trim());
            league.ligaEstatisticas(leagueStatistics[0].replace('%', '').trim(), leagueStatistics[1].replace('%', '').trim(), leagueStatistics[2].replace('%', '').trim());

            listaLigas.push(league)

            //problema - páginas como brazil 2 tem mais detalhes

            listaJogosAnalisados.push(game);
            algorithm.aplicarALgoritmo(game,function(err, data){
                next()
            })
        });
    }
}

function fetchTeamInfo($, teamStats) {
    var equipaInfo = []
    for (var stat_index = 1; stat_index < teamStats.children().length; stat_index++) {
        let estatisticaDaTabela = fetchEstatisticaDaTabela($(teamStats.children()[stat_index]))
        equipaInfo.push(estatisticaDaTabela.replace('%', ''))
    }
    return equipaInfo
}

function colocarInformacaoEquipas(equipa, j, equipaInfo) {
    if (j == 0)
        equipa.informacaoTotal(equipaInfo);
    else if (j == 1)
        equipa.informacaoCasa(equipaInfo);
    else if (j == 2)
        equipa.informacaoFora(equipaInfo);
}

function fetchLeagueGoalsAverage($) {
    var over15 = $('td').filter(function() {
        return $(this).text().trim().includes('Home wins');
    });
    // console.log('Over 15 is : ', over15, ' ');
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
    return [over15, over25, over35]
}

function verificarSeLigaJaFoiAnalisada(game) {
    for(let i = 0; i < listaLigas.length; i++){
        if(game.href==listaLigas[i].link){
            return listaLigas[i];
        }
    }
    return null;
}

function fetchEstatisticaDaTabela(stat) {
    var estatisticaDaTabela = stat.find('span')[0] || stat.find('b')[0] || stat.find('font')[0]
    if(estatisticaDaTabela == undefined) {
        return ''
    }
    return estatisticaDaTabela.children[0].data
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

module.exports = { checkstatsGame };