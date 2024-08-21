// RENDER CHAT TEMPLATED TO THE DOM
// CLEAR THE LOST OF CHATS (WHEN THE ROOM CHANGES)


class ChatUI {
    constructor(list){
        this.list = list;
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
}