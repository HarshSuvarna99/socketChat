const io = require('socket.io')(3000, {
  cors:{
    origin:["http://localhost:5500"]
  }
})

const users = {}

io.on('connection', socket => {
  //give ids to every new client connected 
  socket.on('new-user', name => {
    users[socket.id] = name
    console.log(users);
    socket.broadcast.emit('user-connected', name)
  })

  //receiving mesaage from the client and sending it to everyone who is connected
  socket.on('send-chat-message', (message, room) => {
    if (room) {
      //send personal message
      socket.to(room).emit('chat-message', {message:message, name:users[socket.id]})
    } else {
      socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    }
    
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})