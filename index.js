//set-up
const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const port = process.env.PORT || 3000
const path = require("path")

//serve files
app.get("/", (req, res)=> res.sendFile(path.join(__dirname, "public", "form.html")))
app.get("/chat", (req, res)=> {
  res.sendFile(path.join(__dirname, "public", "chat.html"))
})

let users = 0
// a socket connects(imagine a tube)
io.on("connection", socket=>{
  users++
  //any new connection, emits for all users
  io.emit("users", {users:users})
  
  //emits for all but for the one connecting
  socket.broadcast.emit("newUser", {newUser:"New User Connected"})

  //emits only for the one connected
  socket.emit("welcome", {welcome:`Welcome to the chat`})
  
  //if a socket disconnects
  socket.on("disconnect", (socket)=> { //tell everyone
      users--
      io.emit("users", {nou:users, msg:"A user has left the room"})
    })
  
  //if a socket emits a message, tell everyone
  socket.on("chat message", msg => io.emit("chat message", msg))
})


app.use(express.static("public"))
http.listen(port, () => console.log(`listening on port ${port} `))
