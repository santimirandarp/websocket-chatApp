//without jquery this is very, very tedious.
$(function(){
const socket = io();
$("form").submit(e => {
  e.preventDefault(); // prevents page reloading
  //emits input value when submitting
  socket.emit('chat message', $("#m").val())
  return false;
});
//on incomming message
socket.on('chat message', msg=> $("#messages").append(`<li>${msg}</li>`))
socket.on("users", msg=> $("#nou").text(`Users: ${msg.nou}`))
})

