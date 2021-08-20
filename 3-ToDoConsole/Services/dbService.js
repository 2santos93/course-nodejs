 const fs = require('fs');
 const { convertToAsks } = require('../Helper/task');
 const path = 'db/database.json';

 const saveTasksIntoDB = (data) => {

    fs.writeFileSync(path, JSON.stringify(data)); 

 }

 const getTasksFromDB = () => {
   if(!fs.existsSync(path)) return {};

   const tasks = fs.readFileSync(path, {encoding: 'utf-8'});

   return convertToAsks(JSON.parse(tasks));
 }

 module.exports = {
     saveTasksIntoDB,
     getTasksFromDB
   };