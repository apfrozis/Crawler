var request = require('request');
function visitPage(url, game, callback) {
    // Make the request
    console.log("Visiting page " + url);
    request(url, function (error, response, body) {
        // Check status code (200 is HTTP OK)
        // console.log("Received answer: " + response);
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
                callback(game, error, "Error requesting data")
            } else {
                //console.log('body is ', body)
                callback(game, body, '');
            }
        } else {
            // debugger;
            callback(game, error.toString(), "Error: read ECONNRESET")
        }
    });
}

function dealWithErrorResponse(error) {
    if (error.toString().includes("ECONNRESET") || error.toString().includes("Error")) {
        console.log("Jogo com resposta com erro")
        return true
    }
    return false
}

module.exports = { visitPage, dealWithErrorResponse };