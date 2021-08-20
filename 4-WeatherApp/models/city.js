class City{
    name;
    lat;
    lon;
    weather;
    
    constructor(name, lat, lon){
        this.name = name;
        this.lat = lat;
        this.lon = lon;
    }

    set weather(weather){
        this.weather = weather;
    }

    get weather(){
        return this.weather;
    }

    get name(){
        return this.name;
    }

    get lat(){
        return this.lat;
    }

    get lon(){
        return this.lon;
    }
}

module.exports = City;