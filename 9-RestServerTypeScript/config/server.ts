import express, {Application} from 'express';
import cors from 'cors';

import router from '../routes/user';
import {connection} from './db';

class Server{
    private app: Application;
    private port: string;
    private paths = {
        user: '/api/users'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';

        this.db();
        this.middlewares();
        this.routes();
    }

    db() {
       connection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    routes() {
        this.app.use(this.paths.user, router);
    }
}

export default Server;

