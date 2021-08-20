const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload'); 
const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);
  
class Server{

    constructor(){
        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            file: '/api/files',
            
        }
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
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

   
    }

    routes(){
        this.app.use(this.paths.users, require('../routes/user'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/category'));
        this.app.use(this.paths.products, require('../routes/product'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.file, require('../routes/file'));

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`server listen in port ${this.port}`);
        });
    }

};

module.exports = Server;