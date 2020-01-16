// Arquivo criado na pasta Utils, pois nao fará parte do banco de dados, guardado em Models, mas sim apenas uma utilidade

const mongoose = require('mongoose')

const PointSchema = new mongoose.Schema({
    // "não é o type em si, é como uma coluna"
    type: {
        type: String,
        // Não podemos dizer que o valor é "point", essa estrutura é prevista na documentação do MongoDB - mongoose
        enum: ['Point'],
        required: true, 
    },
    coordinates: {
        // longitude, latitude (padrão mongo)
        type: [Number]
    }
});

module.exports = PointSchema;