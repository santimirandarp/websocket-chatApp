//io() gets loaded from a script src 
const socket = io();

const ul = document.getElementById("messages")
const nou=document.getElementById("nou") //number of users
const newUser=document.getElementById("newUser") 
const welcome=document.getElementById("welcome")

//on submit input/form
document.addEventListener("submit", e => {

  e.preventDefault(); 
  const msg = e.target.elements.m.value
  e.target.elements.m.value="" //clear input.

  socket.emit('chat message', msg) //input value to server
  return false;

});

//data coming from server
socket.on('chat message', msg => {
  ul.innerHTML+=`
    <li>
      <span class="userInfo">user: ${msg}<sub>time</sub></span>
    </li>`
  ul.scrollTop=ul.scrollHeight;
})

//also data from server
socket.on("users", msg => nou.innerHTML=`Users: ${msg.users}`)
socket.on("newUser", msg => newUser.innerHTML=`${msg.newUser}`)
socket.on("welcome", msg => welcome.innerHTML=`${msg.welcome}`)
