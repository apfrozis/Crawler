const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
let log = console;

var MongoModels = {}

/**
 * 
 * read the schemas in a dinamic way
 */
function loadModels() {

    var _models =  fs.readdirSync(__dirname + '/schemas');

    for(let model in _models)
    {
        let file = _models[model];
        console.log('in file loop ', file)

        let filename = path.basename(file, '.js')
        let schema = require( './schemas/' + file);

        //console.log('file name : ', filename   , " schema ",  schema);
        MongoModels[filename] = mongoose.model(filename, schema)
    }

}
 
async function start(url) {
    try {
        await mongoose.connect(url, { 
           useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 10000 
        })

        loadModels()

        log.info('Connection to database established')
    }
    catch(error) {
        log.error('[DATABASE] ERROR ', error)
    }
}


start(process.env.DATABASE_URL);
console.log('Models 2 : ', MongoModels);

module.exports = MongoModels;