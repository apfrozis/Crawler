

require('dotenv').config(); 
// load configurations
let results = require('../crawl_results');


let delay = 1000 * 5;
console.log('Vai correr o script para os resultados em : ', delay);

setTimeout(() => {
    results.gamesResults();

}, delay)