// RENDER CHAT TEMPLATED TO THE DOM
// CLEAR THE LOST OF CHATS (WHEN THE ROOM CHANGES)


class ChatUI {
    constructor(list, roomList, listOfRooms){
        this.list = list;
        this.roomList = roomList;
        this.listOfRooms = listOfRooms
    }
    clear(){
        this.list.innerHTML = '';
    }
    render(data){
        const when = dateFns.formatDistanceToNowStrict(
            new Date(data.created_at.toDate()),
            {addSuffix: true}
          )

        const html = `
            <li class="list-group-item bg-secondary-subtle border border-secondary ">
                <span class="username">${data.username}: </span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
        `;

        this.list.innerHTML += html;
    }
    // this is where i left off so we want to render the single room that was added 
    renderRooms(rm){
            const html = `<button class="btn btn-outline-danger" id="${rm}">#${rm}</button>`
            this.roomList.innerHTML += html;
        

    }

    renderList_rooms(data) {
        const html = `<li class="dropdown-item" id="#${data.roomName}">${data.roomName}</li>`;
        const dropdownMenu = document.querySelector('.dropdown-menu');
        dropdownMenu.innerHTML += html;
      
        // Reinitialize event listeners after adding new items
        initializeEventListeners();
      }
}