

require('dotenv').config(); 
// load configurations
let crawler = require('../crawler30');


let delay = 1000 * 10;
console.log('Vai correr o script para retirar os jogos em : ', delay);

setTimeout(() => {

    crawler.games()

}, delay)