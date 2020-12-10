'use strict'

var express = require('express');
var UserController = require('../controller/user');

var api = express.Router();

api.post('/user',UserController.saverUser);
api.post('/login',UserController.loginUser);
api.get('/users',UserController.getUsers);
api.post('/users',UserController.putUser);
api.delete('/users',UserController.deleteUser);

module.exports = api;