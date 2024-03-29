require('dotenv').config(); // load configurations
const Game = require('./structures/game');
const Equipa = require('./structures/equipa');
const League = require('./structures/league');
const path = require('path');
const async = require('async');
const cronJobs = require('./runnable')

console.log('process.env.DATABASE_URL : ', process.env.DATABASE_URL)

var response;
var express = require('express');
var cors = require('cors');

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://heroku_6b7t2wg0:jo3rl5r1o5n5c5ltcfrt01ljud@ds345028.mlab.com:45028/heroku_6b7t2wg0';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;
var GameModel = require('./data_layer/models/game');


//define and use new datalayer..
const {Database,findAndUpdateGameForPrevious}  =  require('./data_layer/datalayer.js');
const _layer = new Database()

const BASE_URL = process.env.BASE_URL || 'http://localhost';
const PORT = process.env.PORT || 3000;
const API =  process.env.API || '/api/v1';






//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

var corsOptions = {
    origin: BASE_URL + ':' + PORT,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.options('*', cors()) 
app.get(API + '/getstats',cors(corsOptions), function (req, res) {

    // req.query.search

    console.log('Query search ' , req.query.search)
    let criteria = {
        gameDate : new Date(req.query.search)
    }
    _layer.findGameByCriteria(criteria, (err, data ) =>{

        if(err){
            res.status(500).send('Something broke!')
        }
        else{
            let best15 = 0, best25 = 0, best35 = 0;
            let temp ;
            let bests = {
                best15 : {},
                best25 : {},
                best35 : {}
            }
            // descending order
            async.sortBy(data, function(item, callback)
            {
                if(item.over25standardDeviation > best25){
                    temp =  JSON.parse( JSON.stringify(item));
                    delete temp.equipaCasa;
                    delete temp.equipaFora;
                    bests.best25 = temp;
                }
                if(item.over35standardDeviation > best35){
                    temp =  JSON.parse( JSON.stringify(item));
                    delete temp.equipaCasa;
                    delete temp.equipaFora;
                    bests.best35 = temp;
                }
                if(item.over15standardDeviation > best15){
                    temp =  JSON.parse( JSON.stringify(item));
                    delete temp.equipaCasa;
                    delete temp.equipaFora;
                    bests.best15 = temp;
                }

                callback(null, item.over25standardDeviation * -1 );

            }, function(err,result) 
            {
                res.status(200).json({total_game :data.length, bests :  bests , data : data})
            });
            
        }

    });

    

})

app.get(API + '/getdashboardmetrics',cors(corsOptions), function (req, res) {
    debugger;
    req.query.search === 'red'  // true
    console.log("recebeu request")
    response = res;
})

/**
 * Serve statics files of site!
 */
app.use(express.static(path.join(__dirname, './frontend')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './frontend', 'index.html'));
});

var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})