//set-up
const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const port = process.env.PORT || 3000
const path = require("path")

//variables
let User;
let Room;

//serve files
app.get("/", (req, res)=> res.sendFile(path.join(__dirname, "public", "form.html")))
app.get("/app/:user/:room/", (req, res)=> {
  User = req.params.user
  Room = req.params.room
  res.sendFile(path.join(__dirname, "public", `${Room}.html`))
})

let users = 0
// a socket connects(imagine a tube)
io.on("connection", socket => {
  users++
  //any new connection, emits for all users but the new
  socket.broadcast.emit("User Connects", {users:users, newUser:User})

  //emits only for the one connected
  socket.emit("Welcome", {welcome:`Welcome ${User}!`, myName:User})

  //if a socket emits a message, tell everyone
  socket.on("Chat Message", msg => io.emit("Chat Message", 
    {msg:msg.msg, sender:msg.sender}))
//if a socket disconnects
socket.on("disconnect", socket => { //tell everyone
  users--
  io.emit("User Disconnects", {users:users, room:Room, newUser:User, time:time})
})

})

//middleware
app.use("/assets", express.static(__dirname+"/assets"))

http.listen(port, () => console.log(`listening on port ${port} `))
