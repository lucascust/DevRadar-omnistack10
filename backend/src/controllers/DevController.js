// Responsável por receber requisição, ativar o que precisa fazer e devolver uma resposta.

// lib que será usada para resgatar dados da API do Github
const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsString = require('../models/utils/parseStringAsArray')
const { findConnections, sendMessage  } = require('../websocket')

// Funções básicas do controller:
// Store, Index (mostra lista), Show (mostra um Dev), Update e Destroy
// AINDA A SER FEITO: UPDATE, DESTROY
module.exports = {

// Método de busca geral
async index (req, res){
    const devs = await Dev.find();

    return res.json(devs);
},


// função store que armazena no banco de dados
// req = request; res = response
// flag "async" permite que a função demore a responder
async store (req, res) {
    // Uso do username Git retirado do corpo do request
    const { github_username, techs, longitude, latitude } = req.body;

    //Verificação de dualidade de registro
    let dev = await Dev.findOne({ github_username });

    if (!dev){
    // String declarada com crase para permitir insersão de variável na mesma (template strings)
    // Comando await para garantir que o JS aguarde a resposta da API
    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    // Padrão de name = login, ou seja, caso não tenha nome, o valor será o de login.
    const {name = login, avatar_url, bio}  =  apiResponse.data;
    
    // Split, separando por vírgula, 'map' percorre o array, e método "trim" para remover espaços antes/depois de uma string
    techsArray =  parseStringAsString(techs);
    const location = {
        // Exatamente os atributos de PointSchema
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    dev = await Dev.create({
        // Atributos sem valor pois valor = atributo nesse caso (JS - short sintax)
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,

    })

    // Filtrar conexões (10km || 1 tech)
    const sendSocketMessageTo = findConnections(
        { longitude, latitude },
        techsArray
    )

    sendMessage(sendSocketMessageTo, 'new-dev', dev)
    }   

    return res.json(dev);
}
};