import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('test', 'user', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

const connection = async () => {
    try{
        await sequelize.authenticate(); 
        console.log('DB CONECTADA') 
    }catch(err){ 
        console.log(`ERROR DB: ${err}`); 
    }
}

export{
    sequelize,
    connection
};