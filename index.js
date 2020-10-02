//set-up
const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const port = process.env.PORT || 3000
const path = require("path")
const moment = require("moment")

let User;
let time;
let Room;
//serve files
app.get("/", (req, res)=> res.sendFile(path.join(__dirname, "public", "form.html")))
app.get("/app/:user/:room/", (req, res)=> {
  User = req.params.user
  Room = req.params.room
  time = moment().format()
  res.sendFile(path.join(__dirname, "public", `${Room}.html`))
})

let users = 0
// a socket connects(imagine a tube)
io.on("connection", socket => {
  users++
  //any new connection, emits for all users
  io.emit("User Connects", {users:users, newUser:User, time:time})
  
  //emits only for the one connected
  socket.emit("Welcome", {welcome:`Welcome ${User}!`})
  
  //if a socket disconnects
  socket.on("disconnect", socket => { //tell everyone
      users--
      io.emit("User Disconnects", {users:users, room:Room, newUser:User, time:time})
    })
  
  //if a socket emits a message, tell everyone
  socket.on("Chat Message", msg => io.emit("Chat Message", {msg:msg, newUser:User}))
})

//middleware
app.use("/assets", express.static(__dirname+"/assets"))

http.listen(port, () => console.log(`listening on port ${port} `))
