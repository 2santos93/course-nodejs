const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.middlewares();
        this.sockets();
        this.listen();
    }

    middlewares = () => {
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    sockets = () => {
        
        this.io.on('connection', (socket) => {

            socket.on('message', (data) => {
                console.log(`Received: ${data.message}`);
                socket.broadcast.emit('message', data);
            });
  

        });
    }

    listen = () => {
        this.server.listen(process.env.PORT, () => {
            console.log(`Server listenning on port ${process.env.PORT}`);
        });
    }
}

module.exports = Server;