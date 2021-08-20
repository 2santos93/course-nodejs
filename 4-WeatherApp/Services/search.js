const axios = require('axios');
const Weather = require('../models/weather');
const {saveSearchIntoDB, getSearchsFromDB} = require('./db');

class Search {
    searchs = [];

    constructor(){
        this.searchs = this.getSearchs();
    }

    async getCitys(city){

        const instance = axios.create({
            baseURL: process.env.MAPBOX_URL,
            params: {
                access_token: process.env.MAPBOX_KEY,
                limit: 5,
                language: 'es'
            }
        });

        const cityData = await instance.get(`${city}.json`);
        return cityData.data.features;
    }

    async getWeather(lat, lon){
        const instance = axios.create({
            baseURL: process.env.OPEN_WEATHER_URL,
            params: {
                lat,
                lon,
                appid: process.env.OPEN_WEATHER_KEY,
                lang: 'es',
                units: 'metric'
            }
        });

        const {data:weather} = await instance.get('weather');

        return new Weather(
            weather.main.temp, 
            weather.main.temp_min,
            weather.main.temp_max, 
            weather.weather[0].description,
            weather.main.humidity
            );
    }

    saveSearch(search){
        this.searchs.unshift(search);
        if(this.searchs.length > 5) this.searchs = this.searchs.slice(0,5);
        saveSearchIntoDB(this.searchs);
    }

    getSearchs(){
        return getSearchsFromDB();
    }
};

module.exports = Search;