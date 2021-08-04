const fs = require('fs');

require('colors');

const createAndSaveMultiplyTable = async ( base, to , list ) => {
    try{
        const dataTable = makeTable(base, to);
        const path = `Tables/table-${base}.txt`;
        saveTable(path, dataTable);
        if(list) console.log(dataTable);
        return path;
    }catch(err){
        throw err;
    }

}

function makeTable(base, to) {
    let multiplyTable = `
===============
    Table ${base}
===============
`.blue;
    
    for (let i = 1; i <= to; i++) {
        multiplyTable += `${base} x ${i} = ${i * base} \n`.yellow;
    }

    return multiplyTable;
}

function saveTable(path, dataTable) {
    dataTableCleaned = dataTable.replace(/([|[1-9])+m/gm, '');
    fs.writeFileSync(path, dataTableCleaned);
} 

module.exports = {
    createAndSaveMultiplyTable
}
