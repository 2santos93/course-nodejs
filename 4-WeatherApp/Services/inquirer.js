require('colors');
const inquirer = require('inquirer');

const City = require('../models/city');

const goBack = {name:`${'<-'.cyan} Atras`, value: null};

const menuOptionsConfig = [{
    type: 'list',
    name: 'option',
    message: 'Pick a choice',
    choices: [
        {
            name: `${'1.'.cyan} Find City`,
            value: 1
        },
        {
            name: `${'2.'.cyan} Historial`,
            value: 2
        },
        {
            name: `${'0.'.cyan} Exit`,
            value: 0
        }
    ]
}];

const pressEnterConfig = [
    {
        type: 'input',
        name: 'pauseAnswer',
        message: `Press ${'ENTER'.cyan} to continue`
    }
];

const executeMenuAndGetOption = async () => {
    console.clear();
    const {option} = await inquirer.prompt(menuOptionsConfig);
    return option;
};

const pressEnterToContinue = async () => {
    await inquirer.prompt(pressEnterConfig);
};

const getInputValue = async (message) => {
    const input = {
        type: 'input',
        name: 'inputText',
        message,
        validate: (input) => {
            if(input.length <= 0) return 'Cant be empty';

            return true;
        }
    }
    const {inputText} = await inquirer.prompt(input);
    return inputText;
};

const getCitySelected = async (cities) => {

    console.clear();
    
    const choicesCities = cities.map((city, index) => {
        return {
            name: `${++index +'.'.cyan} ${city.place_name}`,
            value: city
        }
    });

    choicesCities.unshift(goBack);

    const citiesConfig = [{
        type: 'list',
        name: 'city',
        message: 'Choose a task',
        choices: choicesCities
    }];

    const {city} = await inquirer.prompt(citiesConfig);

    if(!city) return null;

    return new City(city.place_name, city.center[1], city.center[0]);
};

const showCityInfo(city){
    console.clear();
    console.log(`${'City:'.cyan} ${city.name}`);
    console.log(`${'Latitude:'.cyan} ${city.lat}`);
    console.log(`${'Longitude:'.cyan} ${city.lon}`);
    console.log(`${'Temperature:'.cyan} ${city.weather.temperature}`);
    console.log(`${'Humidity:'.cyan} ${city.weather.humidity}`);
    console.log(`${'Temperature min:'.cyan} ${city.weather.min}`);
    console.log(`${'Temperature max:'.cyan} ${city.weather.max}`);
    console.log(`${'Weather description:'.cyan} ${city.weather.description}`);
}

module.exports = {
    executeMenuAndGetOption,
    pressEnterToContinue,
    getInputValue,
    getCitySelected,
    showCityInfo
};