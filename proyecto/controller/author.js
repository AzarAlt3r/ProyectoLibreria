'use strict'
const author = require('../models/author');
var Author = require('../models/author');

function putAuthor(req, res){
    var authorId = req.params.id;
    var update = req.body;

    Author.findByIdAndUpdate(authorId, update, (err, authorUpdated)=>{
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

function getAuthor(req, res){
    var authorId = req.params.id;
    Author.findById(authorId, (err, result)=>{
    if(err){
        res.status(500).sed({
            message:'Error en el servidor'
        })
    }else{
        if(!result){
            res.status(404).sed({
                message:'No se encontraron datos'
            })
        }else{
            res.status(200).sed({
                message:'Error en el servidor',
                data: result
            })
        }
    }
    });
}
function deleteAuthor(req, res){
    var authorId = req.params.id;
    Author.findByIdAndDelete(authorId, (err, result)=>{
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
function getAuthors(req, res){
    Author.find({}).exec(function(err, result){
        if(err){
            //un error
            res.status(500).send({
                message:'Error en el servidor'
            });
        }else{
            if(!result){
                //sin resultado o con error
                res.status(404).send({
                    message:'No se encontraron datos'
                });
            }else{
                //consulta correcta
                res.status(200).send({
                    message:'Consulta exitoso',
                    data: result
                });
            }
        }
    });
}

function saveAuthor(req,res){
    var params = req.body;
    var author = new Author();
    console.log(params);
    author.name = params.name;
    author.country = params.country;

    if(author.name == null || author.country == null || author.name == '' || author.country == ''){
        res.status(200).send({
            message:'Todos los campos son requridos'
        });
    }
    author.save(function(err, result){
        if(err){
            //error
            res.status(500).send({
                message:'Error interno, no se pudo guardar'
            });
        }else{
            if(result){
                //datos guardados
                res.status(201).send({
                    message:'Datos guardados',
                    data: result
                });
                //console.log("El registro almasenado es:"+data);
            }else{
                //error
                res.status(500).send({
                    message:'Error, intenta nueva mente'
                });
            }
        }
    });
}
module.exports = {
    saveAuthor,
    getAuthors,
    deleteAuthor,
    getAuthor,
    putAuthor
}