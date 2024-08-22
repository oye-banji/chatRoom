// DOM QUERIES
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const addRoom = document.querySelector('.new-room')

//ADD A NEW CHAT

newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err))
}
)

//UPDATE USERNAME
newNameForm.addEventListener('submit', e => {
    e.preventDefault();

    //UPDATE NAME VIA THE CHATROOM CLASS
    let newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();

    //SHOW AND HIDE THE UPDATE MESSAGE

    updateMsg.innerText = `Your name was updated to ${newName}`
    setTimeout(() => updateMsg.innerText = '', 3000)
}
)

//ADD A NEW CHATROOM
// addRoom.addEventListener('submit', e => {
//     e.preventDefault();
//     const text = e.target
//     room.innerHTML =   
// })


// CHECK LOCAL STORAGE FOR A NAME
const username = localStorage.username ? localStorage.username : 'anon';

//UPDATE THE CHAT ROOM
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})


//CLASS INSTANCES
const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom('general', username);

// GET CHATS AND RENDER
chatroom.getChats(data => chatUI.render(data));