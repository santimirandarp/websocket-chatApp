//io() gets loaded from a script src 
const socket = io();

const ul = document.getElementById("messages")
const users__ul=document.getElementById("users__ul")
const nou=document.getElementById("nou") //number of users
const welcome=document.getElementById("welcome")
let myName;
//on submit input/form
document.addEventListener("submit", e => {

  e.preventDefault(); 
  const msg = e.target.elements.m.value
  e.target.elements.m.value="" //clear input.

  socket.emit('Chat Message', {msg:msg, sender:myName, room:"chat"}) //input value to server
  return false;
});

//data coming from server
socket.on('Chat Message chat', msg => {
  ul.innerHTML+=`
    <li>
      <span class="userInfo">${msg.sender}: ${msg.msg}</span>
    </li>`
  ul.scrollTop=ul.scrollHeight;
})

//data from server
socket.on("User Connects chat", data => {
  nou.innerHTML=`Users: ${data.users}`
  users__ul.innerHTML+=` <li><span>${data.newUser}</span></li>`
  //emit to server message Update New with the new user (data.newUser) name.
})

socket.on("Welcome", msg => {
  welcome.innerHTML=msg.welcome
  myName = msg.myName
})

socket.on('User Disconnects', msg => {
  const allLis = users__ul.querySelector('li')
  allLis.forEach(li=> li["data-time"]==msg.time&&li.remove())
})


