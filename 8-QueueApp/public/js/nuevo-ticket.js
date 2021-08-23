const socket = io();

const btnGenerateTicket = document.querySelector('#btnGenerateTicket');
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');

socket.on('connect', () => {
    btnGenerateTicket.disabled = false;

    socket.on('onLoad', ({lastTicketNumber}) => {
        if(lastTicketNumber)
            lblNuevoTicket.innerText = lastTicketNumber;
    })
});

socket.on('disconnect', () => {
    btnGenerateTicket.disabled = true;

});


btnGenerateTicket.addEventListener( 'click', () => {

    socket.emit( 'createTicket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});