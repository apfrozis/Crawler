var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var gameModelSchema = new Schema({
  equipaCasa: {},
  equipaFora: {},
  liga: String,
  href: String,
  over15: String,
  over25: String,
  over35: String,
  gameDate: Date
});

// Compile model from schema

gameModelSchema.methods.findById = function (id, cb) {
    return this.model('Animal').find({ id : id }, cb);
  };



module.exports = gameModelSchema;

