require('dotenv').config();

const {
    executeMenuAndGetOption, 
    pressEnterToContinue, 
    getInputValue,
    getCitySelected,
    showCityInfo
} = require('./Services/inquirer');
const Search = require('./Services/search');

const main = async () => {

    let selectedOption;

    const SearchService = new Search();
    try{
        do{
            selectedOption = await executeMenuAndGetOption();

            switch(selectedOption){
                case 1:
                    const cityText = await getInputValue('City: ');
                    const cities = await SearchService.getCitys(cityText);
                    const city = await getCitySelected(cities);
                    if(!city) continue;
                    const weather = await SearchService.getWeather(city.lat, city.lon);

                    city.weather = weather;
                    SearchService.saveSearch(city);

                    showCityInfo(city);
                    
                    break;
                case 2:
                    console.clear();
                    SearchService.getSearchs().forEach((search, index) => {
                        console.log(`${(++index+'.').cyan} ${search.name}`);
                    });

                    break;
            }

            if(selectedOption !== 0) await pressEnterToContinue();

        }while(selectedOption !== 0);

    }catch(err){
        console.log(`ERROR ${err}`)
    };
};


main();