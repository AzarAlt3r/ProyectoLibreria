'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Peticiones remotas
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//cargar rutas
var book_routes = require('./routes/book');
var authorbooks_routes = require('./routes/authorbook');
var author_routes = require('./routes/author');
var user_routes = require('./routes/user');


//definir una ruta base
app.use('/api', book_routes);
app.use('/api', author_routes);
app.use('/api', authorbooks_routes);
app.use('/api', user_routes);



app.get('/', function(req,res){
    res.status(200).send({
        message:'Bienvenido a mi api rest'
    });
})

module.exports=app;