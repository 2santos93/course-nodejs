"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("../routes/user"));
const db_1 = require("./db");
class Server {
    constructor() {
        this.paths = {
            user: '/api/users'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '3000';
        this.db();
        this.middlewares();
        this.routes();
    }
    db() {
        db_1.connection();
    }
    middlewares() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    routes() {
        this.app.use(this.paths.user, user_1.default);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map