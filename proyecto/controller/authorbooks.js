'use strict'
const authorbook = require('../models/authorbook');
var authorbooks = require('../models/authorbook');

function putAuthorBooks(req, res){
    var authorBookId = req.params.id;
    var update = req.body;

    authorbooks.findByIdAndUpdate(authorBookId, update, (err, authorUpdated)=>{
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

function getAuthorBook(req, res){
    var authorbookId = req.params.id;
    authorbooks.findById(authorbookId, (err, result)=>{
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

function deleteAuthorBook(req, res){
    var authorbookId = req.params.id;
    authorbooks.findByIdAndDelete(authorbookId, (err, result)=>{
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

function getAuthorsBooks(req, res){
    authorbooks.find({}).exec(function(err, result){
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

function saveAuthorBooks(req,res){
    var params = req.body;
    var authorBook = new authorbooks();
    console.log(params);
    authorBook.author = params.author;
    authorBook.book = params.book;
    if(authorBook.author == null || authorBook.author == '' || authorBook.book == null || authorBook.book == ''){
        res.status(200).send({
            message:'Todos los campos son requridos'
        });
    }
            authorBook.save(function(err, result){
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
                    //console.log("El registro almasenado es:" + data);
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
    saveAuthorBooks,
    getAuthorsBooks,
    deleteAuthorBook,
    getAuthorBook,
    putAuthorBooks
}