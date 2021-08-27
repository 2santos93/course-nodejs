import {sequelize} from "../config/db"
import { Model, DataTypes  } from 'sequelize';

class User extends Model{
    public id!:number;
    public email!:string;
    public password!: string;
    public createdAt!: string;
    public updatedAt!: string;
} 

User.init(
    {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
    }
    }, 
    {
        modelName: 'user',
        sequelize: sequelize
    }
);

export default User;