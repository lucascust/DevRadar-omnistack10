const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')


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