const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageTo = document.getElementById('message_to')


const name = prompt('What is your name?')
appendMessage(`${name}'s chat`)
socket.emit('new-user', name)

//receiving mssg
//to display incoming messages on screen
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

//to display when user gets connected
socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

//to display when user gets disconnected
socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

//sending messsage
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  const sendTo = messageTo.value
  //show self message to the client
  appendMessage(`You: ${message}`)
  //send message 
  socket.emit('send-chat-message', message, sendTo)
  messageInput.value = ''
  messageTo.value = ''
})

function appendMessage(message) {
  //creating a new div for the message for the sent message to show in the display
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}