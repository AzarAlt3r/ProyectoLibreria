'use strict'

var express = require('express');
var BookController = require('../controller/book');


var api = express.Router();
var md_auth = require('../middlewares/authenticated')


api.post('/book', BookController.saveBook);
api.get('/books',BookController.getBooks);
api.delete('/book/:id', BookController.deletebook);
api.get('/book/:id',BookController.getBook);
api.put('/book/:id', BookController.putBooks);

module.exports = api;