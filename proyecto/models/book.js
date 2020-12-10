var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BookSchema = Schema({
    title: String,
});

module.exports = mongoose.model('Book', BookSchema);