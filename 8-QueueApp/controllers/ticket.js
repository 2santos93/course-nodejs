const fs = require('fs');
const path = require('path');
const Ticket = require("../models/ticket");

class TicketController{
    constructor(){
        this.init();
    }

    attendTicket(desk){
        if(this.tickets.length <= 0) return null;
        
        const ticket = this.tickets.shift();
        ticket.desk = desk;

        this.lastFour.unshift(ticket);

        if(this.lastFour.length > 4){
            this.lastFour = this.lastFour.slice(0,4);
        }

        this.saveIntoDB();

        return ticket;
    }

    createTicket(){
        this.last += 1;
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveIntoDB();

        return ticket;
    }

    saveIntoDB(){
        const dbPath = path.join(__dirname, '../db', 'data.json');
        fs.writeFileSync(dbPath, JSON.stringify({
            last: this.last,
            tickets: this.tickets,
            lastFour: this.lastFour,
            day: this.day
        }));
    }

    init(){
        const dbData = require('../db/data.json');
        const today = new Date().getDay();
        if(dbData.day === today){
            this.last = dbData.last;
            this.lastFour = this.initTickets(dbData.lastFour);
            this.tickets = this.initTickets(dbData.tickets);
            this.day = today;
            return;
        }

        this.last = 0;
        this.tickets = [];
        this.lastFour = [];
        this.day = new Date().getDay();
        this.saveIntoDB();
    }

    getLastTicketNumber(){
        if(this.tickets.length > 0)
            return (this.tickets[this.tickets.length-1]).getNumber();
    }

    initTickets(tickets) {
        return tickets.map((ticket) => new Ticket(ticket.number, ticket.desk));
    }

    getAttendingTickets(){
        return this.lastFour;
    }

    getPendingTickets(){
        return this.tickets;
    }
}

module.exports = TicketController;
