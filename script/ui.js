// RENDER CHAT TEMPLATED TO THE DOM
// CLEAR THE LOST OF CHATS (WHEN THE ROOM CHANGES)


class ChatUI {
    constructor(list, roomList){
        this.list = list;
        this.roomList = roomList;
        this.al;
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
            <li class="list-group-item">
                <span class="username">${data.username}: </span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
        `;

        this.list.innerHTML += html;
    }
    renderRooms(data){
        
        const html = `
            <button class="btn btn-outline-danger" id="${data.room}">#${data.room}</button>
            `       
        this.roomList.innerHTML += html;
    }
}