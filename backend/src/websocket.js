const socketio = require('socket.io');
const parseStringAsArray = require('./models/utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance')


// O ideal seria armazenar as conexões em um banco de dados
const connections = [];
let io

exports.setupWebsocket = (server) => {
    io = socketio(server);


    // Toda vez que um usuário se conectar, é recebido um objeto chamado "socket"
    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs)
        });
    });
}
// exporta o retorno de uma função que verifica se a distancia entre 2 pontos é <10km && se há pelo menos uma tech
exports.findConnections = (coordinates, techs) => {
    return connections.filter(connections => {
        return calculateDistance(coordinates, connections.coordinates) < 20
            && connections.techs.some(item => techs.includes(item))
    })
}

// Método para "enviar a mensagem"
exports.sendMessage = (to, message, data) => {
    to.forEach(connections => {
        io.to(connection.id).emit(message, data);
    })
}
