'use strict'
const book = require('../models/book');
var Books = require('../models/book');

function putBooks(req, res){
    var authorbookId = req.params.id;
    var update = req.body;

    Books.findByIdAndUpdate(authorbookId, update, (err, authorUpdated)=>{
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

function getBook(req, res){
    var bookId = req.params.id;
    Books.findById(bookId, (err, result)=>{
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

function deletebook(req, res){
    var bookId = req.params.id;
    Books.findByIdAndDelete(bookId, (err, result)=>{
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

function getBooks(req, res){
    Books.find({}).exec(function(err, result){
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

function saveBook(req,res){
    var params = req.body;
    var book = new Books()
    book.title = params.title;
    console.log(params);
    if(book.title == null ||  book.title == ''){
        res.status(200).send({
            message:'Todos los campos son requridos'
        });
        console.log(params);
    }
        book.save(function(err, result){
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
    saveBook,
    putBooks,
    getBook,
    deletebook,
    getBooks
}