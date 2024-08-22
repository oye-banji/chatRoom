// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const addRoom = document.querySelector('.new-room')

// add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

// update the username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  // update name via chatroom
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  // reset the form
  newNameForm.reset();
  // show then hide the update message
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => updateMssg.innerText = '', 3000);
});

//ADD A NEW CHATROOM
addRoom.addEventListener('submit', e => {
    e.preventDefault();
    const text = addRoom.room.value.trim();
    const html = `  <button class="btn btn-outline-danger " id="${text}">#${text}</button>`
    rooms.innerHTML += html;
   
    chatroom.updateRoom(text)
    addRoom.reset();
});

// update the chat room
rooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});



// check local storage for name
const username = localStorage.username ? localStorage.username : 'anon';
const room = localStorage.room ? localStorage.room : 'general';



// class instances
const chatUI = new ChatUI(chatList, rooms);
const chatroom = new Chatroom('general', username);


// get chats & render
chatroom.getChats(data => chatUI.render(data));

//test
chatroom.getRooms(data => chatUI.renderRooms(data));