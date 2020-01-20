import socketio from 'socket.io-client';



const socket = socketio('http://localhost:19002/',{
    autoConnect: false,
});

// quando um dev é cadastrado e satisfaz a pesquisa, essa função mostra-o no mapa
function subscribeToNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs){
    
    // metodo para enviar os parametros para o backend 
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    };

    socket.connect();
}
function disconnect(){
    if(socket.connected){
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
}