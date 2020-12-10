'use stric'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorbookSchema = Schema({
    author:{ type: Schema.ObjectId, ref: 'Author'},
    book:{ type: Schema.ObjectId, ref: 'Book'}
})
module.exports = mongoose.model('authorbook', authorbookSchema);