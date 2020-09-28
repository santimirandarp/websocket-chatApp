//io() gets loaded from a script src 
const socket = io();

const ul = document.getElementById("messages")
const users__ul=document.getElementById("users__ul")
const nou=document.getElementById("nou") //number of users
const welcome=document.getElementById("welcome")

//on submit input/form
document.addEventListener("submit", e => {

  e.preventDefault(); 
  const msg = e.target.elements.m.value
  e.target.elements.m.value="" //clear input.

  socket.emit('Chat Message', msg) //input value to server
  return false;
});

//data coming from server
socket.on('Chat Message', msg => {
  ul.innerHTML+=`
    <li>
      <span class="userInfo">${msg.newUser}: ${msg.msg}</span>
    </li>`
  ul.scrollTop=ul.scrollHeight;
})

//data from server
socket.on("User Connects", msg => {
  nou.innerHTML=`Users: ${msg.users}`
  users__ul.innerHTML+=` <li data-time=${msg.time}> <span>${msg.newUser}</span> </li>`
})

socket.on('User Disconnects', msg => {
  const allLis = users__ul.querySelector('li')
  allLis.forEach(li=> li["data-time"]==msg.time&&li.remove())
})
socket.on("Welcome", msg => welcome.innerHTML=`${msg.welcome}`)
