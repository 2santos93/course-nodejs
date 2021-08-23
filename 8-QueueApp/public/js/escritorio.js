const socket = io();

const btnAttendTicket = document.querySelector('#attendTicket');
const attendedTicket = document.querySelector('#attendedTicket');
const divTicketsEmpty = document.querySelector('#ticketsEmpty');
const lblTicketsPending = document.querySelector('#lblTicketsPending');
divTicketsEmpty.style.display = 'none';

const getDeskFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    
    if(!params.has('desk') || !params.get('desk') != ''){
        return;
    }

    return params.get('desk');
}

btnAttendTicket.addEventListener('click', () => {
    const desk = getDeskFromUrl();
    socket.emit('attendTicket', desk, (ticketNumber) => {
        if(!ticketNumber){
            return alert('No hay tickets');
        } 

        btnAttendTicket.style.display = 'none';
        attendedTicket.innerText = ticketNumber;
        const audio = new Audio('../audio/new-ticket.mp3');
        audio.play();
    });
});

socket.on('pendingTickets', (pendingTickets) => {

    const quantityPendingTickets = pendingTickets.length;

    if(quantityPendingTickets <= 0){
        lblTicketsPending.style.display= 'none'
        return divTicketsEmpty.style.display = '';
    }

    divTicketsEmpty.style.display = 'none';
    lblTicketsPending.style.display = '';
    lblTicketsPending.innerText = quantityPendingTickets;

});

