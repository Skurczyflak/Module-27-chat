//Variables global

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let username;

//Function

function addMessage ( author , content ) {

    const message = document.createElement('li');
    message.classList.add('message', 'message--recieved');

    if ( author === username ) message.classList.add('message--self');
    message.innerHTML = `
        <h3 class="message__author">${username === author ? 'You' : author}</h3>
        <div class="message__content">${content}</div>`
    messagesList.appendChild(message);

}

function login( event ) {
    event.preventDefault();
    const name = userNameInput.value;
    if(name !== '' || name !== null) {
        username = name;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }else {
        alert('Please type your name');
    }
}

function sendMessage( event ) {
    event.preventDefault();
    const userMessage = messageContentInput.value;
    if( userMessage !== '' || userMessage !== null) {
        addMessage( username, userMessage );
    }else {
        alert('Please type your message');
    }
}

//Event Listeners

loginForm.addEventListener('submit', login);

addMessageForm.addEventListener('submit', sendMessage);