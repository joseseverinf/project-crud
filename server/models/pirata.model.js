const mongoose = require('mongoose');

const PirataSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },
    tesoro: {
        type: Number,
        required: [true, 'El tesoro es requerido'],
        min: [0, 'El tesoro debe ser mayor a 0']
    },
    frase: {
        type: String,
        required: [true, 'La frase es requerida'],
        minlength: [3, 'La frase debe tener al menos 3 caracteres']
    },
    rango: {
        type: String,
    },
    pata: {
        type: String,
    },
    parche: {
        type: String,
    },
    garfio: {
        type: String,
    },
}, { timestamps: true });

const Pirata = mongoose.model("Pirata", PirataSchema);

module.exports = Pirata;