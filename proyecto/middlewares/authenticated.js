'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_1234';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({
            message: 'La peticion no tiene una cabecera de autentificaion'
        });
    }
    var token = req.headers.authorization.replace(/['"]+/g,'');
    try{
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                message: 'El token expiro'
            });
        }
    }catch(ex){
        console.log(ex);
        returnres.status(404).send({
            token: false,
            message:'El token no valido'
        })
    }

    req.user = payload;
    next();
}
