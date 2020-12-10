'use strict'

var express = require('express');
var AuthorBookController = require('../controller/authorbooks');

var api = express.Router();
var md_auth = require('../middlewares/authenticated')


api.post('/authorbook', AuthorBookController.saveAuthorBooks);
api.get('/authorbooks', AuthorBookController.getAuthorsBooks);
api.delete('/authorbook/:id', AuthorBookController.deleteAuthorBook);
api.get('/authorbook/:id',AuthorBookController.getAuthorBook);
api.put('/authorbook/:id', AuthorBookController.putAuthorBooks);

module.exports = api;