//adding new chat doc
//setting up a real-time listener to get new chats
//updating the username
//updating the room

class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
        this.arr = [];
    }
    async addChat(message){
        //format a chat object
        const now = new Date();
        const chat = {
            message, 
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        // save the chat document
        const response = await this.chats.add(chat);
        return response; 
    }
    getChats(callback){
        this.unsub = this.chats
        .where('room', '==', this.room )
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    //update the ui
                    callback(change.doc.data());
                }
            });
        });
    }
    getRooms(callback){
        this.chats.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                // this.arr += change.doc.data().room 
                if(!this.arr.includes(change.doc.data().room)){// it never runs this function
                    this.arr+= change.doc.data().room
                    callback(change.doc.data())
                }else{console.log("room already added")}
                
            });
            
        })
    }
    updateName(username){//takes in a string
        this.username = username;
        localStorage.setItem('username', username);
    }
    updateRoom(room){//takes in a string
        this.room = room;
        console.log('room updated');
        localStorage.setItem('room', room)
        if(this.unsub){
            this.unsub();
        }

    }
}



