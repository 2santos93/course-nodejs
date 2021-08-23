class Ticket{
    constructor(number, desk){
        this.number = number;
        this.desk = desk;
    }

    getNumber(){
        return `Ticket ${this.number}`;
    }
}

module.exports = Ticket;