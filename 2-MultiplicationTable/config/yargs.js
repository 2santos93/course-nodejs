const yargs = require('yargs')
    .options('b', {
        alias: 'base',
        demandOption: true,
        describe: 'base to multiplication table',
        type: 'number'
    })
    .option('l', {
        alias: 'list',
        demandOption: false,
        describe: 'show multiplication table on console',
        type: 'boolean',
        default: false
    })
    .option('t', {
        alias: 'to',
        demandOption: false,
        describe: 'indicates the number of operations',
        type: 'number',
        default: 10

    })
    .check( (argv, options) => {
        if(isNaN(argv.b)) throw Error('Base must be a valid number');
        if(isNaN(argv.t)) throw Error('To must be a valid number');

        return true;
    })
    .argv

module.exports = yargs

