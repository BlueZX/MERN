const express = require('express');
const Libro = require('../models/libro');
const bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/libro', function (req, res) {
    
    Libro.find({})
            .exec((err, libros) => {
                if(err){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    libros
                })
            })

});

app.post('/libro', function (req, res) {
    
    let body = req.body;

    let libro = new Libro({
        codigo: body.codigo,
        nombre: body.nombre,
        autor: body.autor,
        cantidad: body.cantidad
    });

    libro.save( (err, libroDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok:true,
            libro: libroDB
        });
        

    });

});

app.put('/libro/:codigo', function(req, res) {
    let codigo = req.params.codigo;
    let body = req.body;

    Libro.findOneAndUpdate({'codigo': codigo}, body, { new: true }, (err, libroDB)=> {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            libro: libroDB
        })
    })
});

app.delete('/libro/:codigo', function(req,res) {
    let codigo = req.params.codigo;

    Libro.findOneAndRemove({'codigo': codigo}, (err, libroBorrado) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            libro: libroBorrado
        })
    });


});

module.exports = app;