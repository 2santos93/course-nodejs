const socket = io();

const inputText = document.querySelector('#inputText');
const buttonSend = document.querySelector('#btnSend');

buttonSend.addEventListener('click', () => {

    const message = {
        date: Date.now(),
        message: inputText.value,
        id: socket.id
    }

    socket.emit('message', message);
}); 

socket.on('message', (data) => {
    console.log(`Received: ${data.message}`);
});

socket.on('connect', () => {
});

socket.on('disconnect', () => {
});