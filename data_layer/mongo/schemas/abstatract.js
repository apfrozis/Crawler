const Schema = require('mongoose').Schema

const AbstractSchema = new Schema({
    field1: Object,
    field2: Object,
    username : String,
    password : String,
    etc : String
},
{ collection: 'db_abstract', versionKey: false })

module.exports = AbstractSchema