
require('dotenv').config(); 
// load configurations
let results = require('./crawl_results');
let crawler = require('./crawler30');

/*
    Correr estas duas duas as 6 da manha
*/

function runScriptsIfTime()
{
  let date = new Date();
  let hour = date.getUTCHours();

  let gameHour =  process.env.GAMES_RUN_HOUR  * 1;
  let resultsHour =  process.env.RESULTS_RUN_HOUR  * 1;

  if(gameHour === hour ){
    console.log('Run game Algs for tomorrow ' )
    crawler.games()
  }else if(resultsHour === hour){
    console.log('Run game get results from yesterday' );
    results.gamesResults();
  }

}

var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.minute = process.env.RUN_MINUTE;
 
console.log('CRON JOB - Start to run at every ', rule.minute);
var j = schedule.scheduleJob(rule, function(){
  let date = new Date();
  let hour = date.getUTCHours();
  console.log('Will run at desired date : ', date );
  let gameHour =  process.env.GAMES_RUN_HOUR  * 1;
  let resultsHour =  process.env.RESULTS_RUN_HOUR  * 1;
  console.log('Process vars gameHour ',gameHour , ' result Hours ',resultsHour, ' actual hour ',  hour );

  runScriptsIfTime();
});

module.exports.start = j;