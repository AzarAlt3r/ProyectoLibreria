'use strict'

const { modelNames } = require('mongoose');
var User = require('../models/user');
var bcrypt = require ('bcrypt-nodejs');
var jwt = require('../services/jwt');

function getUsers(req,res){
    //if (req.user.role == "Role_Admin"){
        User.find({}).exec(function(err, result){
            if(err){
                //un error
                res.status(500).send({
                    message:'Error en el servidor'
                });
            }else{
                if(!result){
                    //sin resultados o con errores
                    res.status(404).send({
                        message: 'No se encontraron datos'
                    });
                }else{
                    //consulta correcta
                    res.status(200).send({
                        message: 'consulta exitosa',
                        data: result
                    });
                }
            }
        })
    //}else{
        //res.status(403).send({
            //message:'No tienes permiso para acceder a este recurso'
        //});
   //}
}

function putUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, authorUpdated)=>{
        if(err){
            res.status(500).send({
                message:'Error en el servidor'
            });
        }else{
            if(!authorUpdated){
                res.status(404).send({
                    message:'No se pudo actualizar'
                });
            }else{
                res.status(200).send({
                    message:'Autor actualizado',
                    data: authorUpdated
                });
            }
        }
    })
}

function saverUser(req, res){
    var user =new User();
    var params = req.body;
    user.name = params.name;
    user.email = params.email;
    user.role = 'Role_Admin';
    user.image= 'null';

    if(params.password){
        bcrypt.hash(params.password,null,null,function(err,hash){
            user.password = hash;
            if(user.name != null && user.email != null){
                user.save((err, data)=>{
                    if(err){
                        if(err.code == 11000){
                            res.status(500).send({
                                message:'Ese correo ya existe',
                            });
                        }else{
                            res.status(500).send({
                                message:'Error del servidor',
                            });
                        }
                    }else{
                        if(!data){
                            res.status(500).send({
                                message:'No se pudo guardar al usuario'
                            });
                        }else{
                            res.status(201).send({
                                message:'Usuario creado',
                                data: data
                            });
                        }
                    }
                })
            }else{
                res.status(200).send({
                    message:'Todos los datos son requeridos'
                });
            }
        });
    }
}

function loginUser(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;
    User.findOne({email: email}, (err, user)=>{
        if(err){
            res.status(500).send({
                message: 'Error en el servdor'
            });
        }else{
            if(!user){
                res.status(404).send({
                    message: 'Error usuario no existe'
                });
            }else{
                bcrypt.compare(password,user.password,function(err,check){
                    if(check){
                        res.status(200).send({
                            message:'login correcto',
                            token: jwt.creatteToken(user)
                        });
                    }else{
                        res.status(404).send({
                            message: 'Login incorrecto'
                        });
                    }
                })
            }
        }
    })
}

function deleteUser(req, res){
    var userId = req.params.id;
    User.findByIdAndDelete(userId, (err, result)=>{
        if(err){
            //si ocurre un error
            res.status(500).send({
                message:'Error del servidor'
            });
        }else{
            if(!result){
            //si no encuentra el id
            res.status(404).send({
                message:'Ese registro no existe'
            });
            }else{
                //si lo encuentra y lo borra
                res.status(200).send({
                    message:'Requistro borrado correctamente',
                    data: result
                });
            }
            
        }
    });
}

module.exports={
    saverUser,
    loginUser,
    getUsers,
    deleteUser,
    putUser
}