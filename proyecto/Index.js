'use strict'
const monogoose = require('mongoose');
var app = require('./app');
var port = process.env.port || 8000;
monogoose.connect('mongodb://localhost/proyecto',{useNewUrlParser:true, useUnifiedTopology: true}, function(err, db){
    if(err){
        throw err;
    }else{
        console.log("Conectado a la base de datos");
        app.listen(port,function(){
            console.log("Servidor express funcionando en http://localhost:"+port);
        })
    }
})