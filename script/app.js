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
const addroomMssg = document.querySelector('.addroom-mssg')
const btnRooms = rooms.querySelectorAll('.btn')

// check local storage for name
const username = localStorage.username ? localStorage.username : 'anon';
const room = localStorage.room ? localStorage.room :'general';
addItemToList('general')
const list = localStorage.getItem("myListKey")



//ADDING ITEM TO LOCAL STORAGE
function addItemToList(newItem) {
  // Retrieve the existing list from local storage
  let list = localStorage.getItem('myListKey');
  
  // If there's no list, start with an empty array
  if (list) {
    list = JSON.parse(list); // Deserialize the existing list
  } else {
    list = []; // Initialize an empty array if no list exists
  }
  if(list.includes(newItem)){
    //check if item already exist in local storage
    console.log('item already exist')
    addRoomForm.reset()
  }else{
     // Add the new item to the list
  list.push(newItem);
  }
  // Serialize the updated list and save it back to local storage
  localStorage.setItem('myListKey', JSON.stringify(list));
}

//GETTING ITEMS DROM THE LOCAL STORAGE, RETURNS A LIST
function getList() {
  // Retrieve the list from local storage
  const list = localStorage.getItem('myListKey');
  
  // Check if the list exists and parse it
  if (list) {
    return JSON.parse(list);
  } else {
    return []; // Return an empty array if no list exists
  }
}


// ADDS A NEW CHAT
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

// UPDATES THE USERS NAME
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  // update name via chatroom
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  // reset the form
  newNameForm.reset();
  // show then hide the update message
  updateMssg.innerHTML =  `<p class="errmsg text-info">Your name was updated to ${newName}</p>`;
  setTimeout(() => updateMssg.innerHTML = '', 3000);
});

// ADD A NEW CHATROOM TO THE DOM/DATABASE
addRoomForm.addEventListener('submit', async e => {
   e.preventDefault();
  const text = addRoomForm.room.value.trim().toLowerCase();

  try {
      const exists = await chatroom.checker(text);
      if (exists) {
          await chatroom.addRoom(text);
          chatroom.updateRoom(text);
          chatroom.getRoom(room => chatUI.renderRooms(room), text);
          addItemToList(text)
          addRoomForm.reset();
          addroomMssg.innerHTML = `<p class="errmsg text-info">${text} has been added</p>`
          setTimeout(() => addroomMssg.innerHTML = '', 5000)
      } else {
          console.log('Room already exists');
          addRoomForm.reset();
          addroomMssg.innerHTML = `<p class="errmsg text-warning">${text} already exist check header <All Rooms> to access all existing room</p>`
          setTimeout(() => addroomMssg.innerHTML = '', 10000)
      }
  } catch (err) {
      console.error('Error adding room:', err);
  }
});



// UPDATES THE NEW CHAT ROOM WHEN CLICKED, RENDERS EXISTING CHAT IF AVAILABLE
rooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON'){}
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  
     handleRoomClick(e);
  }
);

// HIGHLIGHTS BUTTON FOR ACTIVE ROOM-EASE OF THE USER
function handleRoomClick(e) {
  // Check if the clicked element is a button
  if (e.target.tagName === 'BUTTON') {
    // Clear previous chat UI and update the room
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
    
    // Update the list of buttons
    const btnRooms = rooms.querySelectorAll('.btn');

    // Remove 'active' class from all buttons
    btnRooms.forEach(btn => btn.classList.remove('active'));
    
    // Add 'active' class to the clicked button
    e.target.classList.add('active');
  }
}

// DROPSDOWN THE DROPDOWN MENU
dropdown.addEventListener('click', () => {
  
  dropdownMenu.classList.toggle('active')
});

// ADDS THE ROOM IN THE DROPDOWN MENU TO THE PAGE DIRECTLY WHEN CLICKED FROM THE DROPDOWN MENU
function initializeEventListeners(){
  const roomDrop = document.querySelectorAll('.dropdown-item');
  
  
  roomDrop.forEach(tab => tab.addEventListener('click', e => {
    
    if (e.target.tagName === 'LI') {
      dropdownMenu.classList.remove('active')
      const selector = `${e.target.getAttribute('id')}`;
      const text = selector.slice(1)
     // console.log(text); // Check if this logs the correct selector
      chatroom.updateRoom(text); 
      addItemToList(text);
      if(!list.includes(text)){
        chatroom.getRoom(room => chatUI.renderRooms(room), text);
      }
    }
      handleRoomClick(e);
  }));}








// class instances
const chatUI = new ChatUI(chatList, rooms, dropdownMenu);
const chatroom = new Chatroom(room, username);

// get chats & render
chatroom.getChats(data => chatUI.render(data));
chatroom.list_rooms(data => chatUI.renderList_rooms_drop(data))
chatUI.renderRooms_btn(list)

