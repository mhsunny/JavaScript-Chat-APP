//adding new chat documents
//seeting up rtealtime chat listeners to get new chats
//updating the username
//updating the room
class Chatroom {

    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    async addChat(message) {
        //format chat object
        const now = new Date();
        const chat = {
            message,
            room: this.room,
            username: this.username,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        const response = await this.chats.add(chat);
        return response;
    }
    getChats(callback) {
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        // console.log(change.data())
                        //update ui 
                        callback(change.doc.data());
                    }
                })
            })
    }
    updateName(username) {
        this.username = username;
        localStorage.setItem('username', username);
    }
    updateRoom(room) {
        this.room = room;
        console.log('room updated')
        if (this.unsub) {
            this.unsub()
        }

    }
}

// const chatroom = new Chatroom('general', 'sunny');
// chatroom.getChats((data) => {
//     console.log(data);
// })

// setTimeout(() => {
//         chatroom.updateRoom('gaming')
//         chatroom.updateName('Yellin')

//         chatroom.getChats((data) => {
//             console.log(data);
//         })
//         chatroom.addChat('How are you?');
//     }, 3000)
// chatroom.addChat('hello everyone').then(() => {
//     console.log('add')
// }).catch(error => {
//     console.log('problem')
// })
// console.log(chatroom)