const socket = io();
const messages = document.querySelector('#messages');
const input = document.querySelector('input');
const button = document.querySelector('button');

onInput();
input.addEventListener('keyup', onInput);
socket.on('chat message', socketOnChatMessage);

/* ==============================
 Functions
 ================================ */
function onClickSend() {
  socket.emit('chat message', input.value);
  input.value = '';
  onInput();
}

function socketOnChatMessage(msg) {
  let li = document.createElement('li');
  let text = document.createTextNode(msg);
  
  li.appendChild(text);
  messages.appendChild(li);
}

function onInput() {
  button.disabled = input.value === '';
}
