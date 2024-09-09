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
            <li class="list-group-item bg-primary-subtle border border-secondary text-break">
                <span class="username">${data.username}: </span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
        `;

        this.list.innerHTML += html;
    }
   
    //adds room one at a time to DOM
    renderRooms(rm){
        const html = `<button class="btn btn-outline-info text-break" id="${rm}">#${rm}</button>`
        this.roomList.innerHTML += html;
    }

    //reads localstorage and outputs to DOM
    renderRooms_btn(list){
        const tempList = JSON.parse(list)
        tempList.forEach(rm => {
            const html = `  <button class="btn btn-outline-info text-break" id="${rm}">#${rm}</button>`
            this.roomList.innerHTML += html;
        })
        
    }

    // RENDERS EACH ROOM TO THE DROPDOWN MENU CONTAINER
    renderList_rooms_drop(data) {
        const html = `<li class="dropdown-item text-info text-break" id="#${data.roomName}">${data.roomName}</li>`;
        const dropdownMenu = document.querySelector('.dropdown-menu');
        dropdownMenu.innerHTML += html;
      
        // Reinitialize event listeners after adding new items
        initializeEventListeners();
      }
}