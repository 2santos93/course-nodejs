const TicketController = require("./ticket");

const ticketController = new TicketController();

const socketController = (socket) => {
    
    socket.emit('lastTicket', ticketController.getLastTicketNumber());

    socket.emit('attendingTickets', ticketController.getAttendingTickets());

    socket.emit('pendingTickets', ticketController.getPendingTickets());

    socket.on('createTicket', (data, callback) => {

        const ticket = ticketController.createTicket();
        socket.broadcast.emit('pendingTickets', ticketController.getPendingTickets());
        callback(ticket.getNumber());
    });


    socket.on('attendTicket', (desk, callback) => {
        const ticket = ticketController.attendTicket(desk);
        socket.broadcast.emit('attendingTickets', ticketController.getAttendingTickets());

        socket.broadcast.emit('pendingTickets', ticketController.getPendingTickets());
        socket.emit('pendingTickets', ticketController.getPendingTickets());

        callback(ticket?.getNumber());
    });

}

module.exports = socketController;