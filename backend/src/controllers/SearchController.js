// Arquivo criado pois um Controller não pode ter dois métodos "Index", logo, aqui haverá um novo Index

const Dev = require('../models/Dev')
const parseStringAsArray = require('../models/utils/parseStringAsArray')


module.exports = {
    async index(req, res){
        const { latitude, longitude, techs } = req.query;
        
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                // $in é um operador lógico do mongoDB
                $in: techsArray,
            },
            location: {
                // Operador do Mongo que filtra por localizção
                $near: {
                    // Estrutura para receber localização
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    // Define distância máxima em metros
                    $maxDistance: 10000,
                },
            },
        });
        
        // Método para buscar todos os devs em um raio
        // Filtrar por tecnologias
        return res.json({ devs})
    }
}