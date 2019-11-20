const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
let log = console;

const MongoModels = {}

function loadModels() {
    var path_ = fs.readFile(__dirname);

    console.log('??????????????  dels ',path_ )
	fs.readdirSync(path_).forEach(async (file) => {
        console.log
        try
        {

            let filename = path.basename(file, '.js')
            let schema = require(path.resolve(path_, file))

            console.log('file namea : ', filename   , " schema ",  schema);
            MongoModels[filename] = mongoose.model(filename, schema)
        
        }
        catch (err)
        {
            log.error('Error loading route', file, ' error,', err);
        }
	})
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