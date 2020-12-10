'use strict'

var express = require('express');
var AuthorController = require('../controller/author');
const author = require('../models/author');

var api = express.Router();
var md_auth = require('../middlewares/authenticated')


api.post('/author', AuthorController.saveAuthor);
api.get('/authors',AuthorController.getAuthors);
api.delete('/author/:id', AuthorController.deleteAuthor);
api.get('/author/:id',AuthorController.getAuthor);
api.put('/author/:id', AuthorController.putAuthor);

module.exports = api;