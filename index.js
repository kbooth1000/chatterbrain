//   MAKE PARTICIPANTS LIST WORK ----
let ws;

let receiveMessage = function (message) {
  console.log('your message: ' + message);
  let messageLine = document.createElement('li');
  if (message.data.substring(0, 2) === '$$') {
    let participantLi = document.createElement('li');
    participantLi.textContent = message.data.substring(2);
    document.querySelector('.user-list').appendChild(participantLi);
    messageLine.textContent = message.data.substring(2) +
      ' has joined this chat.';
  } else {
    messageLine.textContent = message.data;
  };
  messageLine.classList.add('chat-messages');
  document.body.querySelector('.chat-message-list').appendChild(messageLine);
};

let sendMessage = function () {
  let message = document.body.querySelector('.form-control').value;
  console.log(message);
  ws.send(message);
  document.body.querySelector('.form-control').value = '';

};

let connectToServer = function () {
  ws = new WebSocket('ws://localhost:3001');
  ws.addEventListener('message', receiveMessage);

};

document.addEventListener('DOMContentLoaded', function () {
  connectToServer();
  let chatButton = document.body.querySelector('#chat-text-button');
  chatButton.addEventListener('click', sendMessage);
  let textBox = document.body.querySelector('.form-control');
  textBox.addEventListener('keydown', function (event) {

    console.log('Pop: ' + event.keyCode);
    if (event.keyCode === 13) {
      event.preventDefault();
      chatButton.click();
    }
    return false;
  });
}, false);