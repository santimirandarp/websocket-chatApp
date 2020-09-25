//set-up
const express = require("express")
const app = express()
const path = require("path")
const http = require("http").createServer(app)
const io = require("socket.io")(http)

//events fired
let users = 0
io.on("connection", socket=>{
  users++
  io.emit("users", {nou:users})
  socket.broadcast.emit("welcome", {msg:"New User Connected"})
  socket.on("disconnect", (socket)=>
    {
      users--
      io.emit("users", {nou:users, msg:"A user has left the room"})
    })
  socket.on("chat message", msg => {
    io.emit("chat message", msg)
  })
})

app.get("/", (req, res)=> res.sendFile(path.join(__dirname, "public", "index.html")))
app.use(express.static("public"))
http.listen(3000, ()=>console.log("listening on port 3000"))
