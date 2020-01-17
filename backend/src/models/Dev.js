// Este arquivo declara a entidade "Dev" juntamente com seus atributos acompanhados de seus tipos

const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')

// Schema = Entidade
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        // indice padrão para ponto de long, lat, (esfera 2d)
        index: '2dsphere',
    }
});

module.exports = mongoose.model('Dev', DevSchema);