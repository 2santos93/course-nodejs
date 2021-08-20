class Weather{
    constructor(temp, min, max, desc, hum){
        this.temp = temp;
        this._min = min;
        this._max = max;
        this.desc = desc;
        this.hum = hum;
    }

    get temperature(){
        return this.temp;
    }
    get min(){
        return this._min;
    }
    get max(){
        return this._max;
    }
    get description(){
        return this.desc;
    }
    get humidity(){
        return this.hum;
    }
}

module.exports = Weather;