const http = require('http')
const { Server } = require('socket.io')

const PORT = process.env.PORT || 3000
const URL = process.env.FRONTEND_URL || "http://localhost:5173"

const server = http.createServer()
const io = new Server(server, {
    cors:{
        origin: URL
    }
})

io.on('connection', (socket) => {
    socket.on('move', (msg) => {
      let rid = JSON.parse(msg).rid
      socket.to(rid).emit('move-log', msg);
    });
  });

io.on('connection',socket=>{
  socket.on('change',data=>{
    let rid = JSON.parse(data).rid
    socket.to(rid).emit('change-board',data)
  })
})

io.on('connection',socket=>{
  socket.on('joinRoom',(rid)=>{
    socket.join(rid)
  })
})

server.listen(PORT,console.log('Server running in port:'+PORT))