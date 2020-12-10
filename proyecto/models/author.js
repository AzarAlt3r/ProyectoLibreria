var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = Schema({
    name : String,
    country : String
});

module.exports = mongoose.model('Autor', AuthorSchema);
