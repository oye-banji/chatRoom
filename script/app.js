// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const addRoomForm = document.querySelector('.new-room');
const dropdown = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
const roomDrop = document.querySelectorAll('.dropdown-item');

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

// Add a new chatroom to the database
addRoomForm.addEventListener('submit', async e => {
  e.preventDefault();
  const text = addRoomForm.room.value.trim();

  try {
      const exists = await chatroom.checker(text);
      if (exists) {
          await chatroom.addRoom(text);
          chatroom.updateRoom(text);
          chatroom.getRoom(room => chatUI.renderRooms(room), text);
          addRoomForm.reset();
      } else {
          console.log('Room already exists');
      }
  } catch (err) {
      console.error('Error adding room:', err);
  }
});



// update the chat room
rooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
    
  }
});

//dropdown menu
dropdown.addEventListener('click', () => {
  dropdownMenu.classList.toggle('active')
});

function initializeEventListeners(){
  const roomDrop = document.querySelectorAll('.dropdown-item');
  console.log(roomDrop); // Check if this logs the correct NodeList

  roomDrop.forEach(tab => tab.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
      dropdownMenu.classList.remove('active')
      const selector = `${e.target.getAttribute('id')}`;
      const text = selector.slice(1)
      console.log(text); // Check if this logs the correct selector
      chatroom.updateRoom(text);       
      chatroom.getRoom(room => chatUI.renderRooms(room), text);
    }
  }));}

function addRemoveActive(text, classForm){

}



// check local storage for name
const username = localStorage.username ? localStorage.username : 'anon';
const room = localStorage.room ? localStorage.room : 'general';




// class instances
const chatUI = new ChatUI(chatList, rooms, dropdownMenu);
const chatroom = new Chatroom('general', username);


// get chats & render
chatroom.getChats(data => chatUI.render(data));
chatroom.list_rooms(data => chatUI.renderList_rooms(data))

//test
//chatroom.getRoom(allRooms => chatUI.renderRooms(allRooms));


//                  NOTES FOR TOMORROW/TODAY
// local storage for chatroom buttons then after reload it checks that and puts button on the screen
// A way we can check if the room as already been added on the page is to check local storage if it already exist and then output it if it does or or send a message if it already exit

// highlight chatroom button that we are in right now only general is highlighted through raw coding

// A FUNCTION TO BE INSERTED AFTER EVERY UPDATE ROOOM WHICH MAKES THE LAST REMOVES ACTIVE FROM THE LAST ROOM THEN MAKES THE UPDATED ROOM ACTIVE HIGHLIGHTING THE NEW ROOM SO THE USER KNOWS WHICH ONE ROOM HES IN
// so we create a class that takes in the room list and and text / actually we can code it the way roomdrop is coded which we check which one 


// minor minor issue
