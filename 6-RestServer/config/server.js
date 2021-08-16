const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.listen();
    }

    async dbConnection(){
        try{

            await mongoose.connect(process.env.DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });

            console.log('DB Ready!');
        }catch(err){
            console.log(err);
        }

    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use('/api', require('../routes/users'));
        this.app.use('/api/auth', require('../routes/auth'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`server listen in port ${this.port}`);
        });
    }

};

module.exports = Server;