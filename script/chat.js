//adding new chat doc
//setting up a real-time listener to get new chats
//updating the username
//updating the room

class Chatroom {
    constructor(room, username){
      this.room = room; // chat
      this.username = username; // chat
      this.chats = db.collection('chats');
      this.dbRoom = db.collection('rooms'); // rooms

      this.unsub;
    }
    async addChat(message){
      // format a chat object
      const now = new Date();
      const chat = {
        message: message,
        username: this.username,
        room: this.room,
        created_at: firebase.firestore.Timestamp.fromDate(now)
      };
      // save the chat document
      const response = await this.chats.add(chat);
      return response;
    }
    list_rooms(callback){
        this.dbRoom
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(
                change => callback(change.doc.data())
            )
        })

    }
    getChats(callback){
      this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if(change.type === 'added'){
              callback(change.doc.data());
            }
          });
      });
    }

    // Checker function to verify if room already exists
    async checker(roomAdded) {
        try {
            const snapshot = await this.dbRoom.get();
            let roomExists = false;
            
            snapshot.docs.forEach(doc => {
                if (doc.data().roomName === roomAdded) {
                    roomExists = true;
                }
            });
            return !roomExists; // Return true if room does not exist
        } catch (err) {
            console.error('Error checking room:', err);
            return false;
        }
    }

    async addRoom(roomName){
        const room = {
            roomName
        }
        const response = await this.dbRoom.add(room)
        return response;
    }

    getRoom(callback, newRoom){
        this.dbRoom.get()
        .then(snapshot => {
            snapshot.docs.forEach( doc => {
                if(doc.data().roomName == newRoom){
                    callback(doc.data().roomName)
                }
            })
        })
        .catch(err => console.log(err))
     }

    updateName(username){
      this.username = username;
      localStorage.username = username;
    }
    updateRoom(room){
      this.room = room;
      console.log('room updated');
      if(this.unsub){
        this.unsub();
      }
    }
  }
