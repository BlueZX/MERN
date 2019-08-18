const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let libroSchema = new Schema({
    codigo: {
        type: String,
        required: [true, 'El codigo es necesario']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    autor: {
        type: String,
        required: [true, 'Es necesario un autor']
    },
    cantidad: {
        type: Number,
        required: [true, 'Es necesaria una cantidad']
    }
});

module.exports = mongoose.model('Libro', libroSchema);