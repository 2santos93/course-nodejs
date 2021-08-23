const socketController = (socket) => {

    socket.on('message', (data) => {
        console.log(`Received: ${data.message}`);
        socket.broadcast.emit('message', data);
    });

};

module.exports = {
    socketController
}