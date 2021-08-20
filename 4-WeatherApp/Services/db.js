 const fs = require('fs');
 const path = 'db/database.json';

 const saveSearchIntoDB = (data) => {

    fs.writeFileSync(path, JSON.stringify(data)); 

 }

 const getSearchsFromDB = () => {
   if(!fs.existsSync(path)) return [];

   const searchs = fs.readFileSync(path, {encoding: 'utf-8'});

   return JSON.parse(searchs);
 }

 module.exports = {
    saveSearchIntoDB,
    getSearchsFromDB
   };