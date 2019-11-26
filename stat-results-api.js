require('dotenv').config(); // load configurations
const Game = require('./structures/game');
const Equipa = require('./structures/equipa');
const League = require('./structures/league');
const async = require('async');

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
const Layer  =  require('./data_layer/datalayer.js');
const _layer = new Layer()



//example of save values
setTimeout(function() {

    console.log('save in the database...')
    var modelToSave = {
        username : "vitor viana",
        password : "benfica"
    }
    _layer.abstractModel_save(modelToSave, () =>{});

}, 1000 * 5)




//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app.options('*', cors()) 

app.get('/getstats',cors(corsOptions), function (req, res) {
    debugger;
    req.query.search === 'red'  // true
    console.log("recebeu request")
    response = res;
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})