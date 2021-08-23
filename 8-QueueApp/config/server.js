const express = require('express');
const socketController = require('../controllers/socket');

class Server{
    constructor(){
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.sockets();
        this.middlewares();
        this.listen();
    }

    sockets(){
        this.io.on('connection', socketController);
    }

    middlewares(){
        this.app.use(express.static('public'));
    }

    listen(){
        this.server.listen(process.env.PORT, () => {
            console.log(`Server listenning on port: ${process.env.PORT}`);
        });
    }
}

module.exports = Server;