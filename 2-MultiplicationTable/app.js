const {createAndSaveMultiplyTable} = require('./tableManager.js')
const {base, list, to} = require('./config/yargs');

createAndSaveMultiplyTable(base, to, list)
    .then( path =>  console.log(`Has been created ${path}`.green))
    .catch( err => console.log(`Error: ${err}`.red));
