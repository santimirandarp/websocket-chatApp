//set-up
const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const port = process.env.PORT || 3000
const path = require("path")

//variables
let user;
let room;

//serve files
app.get("/", (req, res)=> res.sendFile(path.join(__dirname, "public", "form.html")))
app.get("/app/:user/:room/", (req, res)=> {
  user = req.params.user
  room = req.params.room
  res.sendFile(path.join(__dirname, "public", `${room}.html`))
})

let users = 0
// a socket connects(imagine a tube)
io.on("connection", socket => {
  users++
  //any new connection, emits for all users but the new
  socket.broadcast.emit(`User Connects ${room}`, {users:users, room:room, newUser:user})

  //emits only for the one connected
  socket.emit("Welcome", {welcome:`Welcome ${user}!`, myName:user, room:room})

  //if a socket emits a message, tell everyone
  socket.on(`Chat Message`, msg => io.emit(`Chat Message ${msg.room}`, 
    {msg:msg.msg, sender:msg.sender, room:room}))
//if a socket disconnects
socket.on("disconnect", socket => { //tell everyone
  users--
  io.emit("User Disconnects", {users:users, room:room, newUser:user})
})

})

//middleware
app.use("/assets/fonts/", express.static(__dirname+"/assets/fonts/"))
app.use("/assets", express.static(__dirname+"/assets"))

http.listen(port, () => console.log(`listening on port ${port} `))
