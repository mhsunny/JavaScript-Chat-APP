"# JavaScript Simple Chat APP" 

This is sample mordern JavaScript chat application using ES6, more than two users can join to the chatroom.
Authentication not added if you want then you can add this login system. 

<p>Created by <a href="https://www.mmhsunny.com/">MH Sunny </a> Hire me: Contact https://www.mmhsunny.com/.</p>

#Project Demo : 
https://nosqltutorial-4e9ee.firebaseapp.com/

#Source Code: 
https://github.com/mhsunny/JavaScript-Chat-APP

- Using the Firebase NoSQL database
- Two or more people can join the chat room
- severral chatroom, you can join  on your sepefic one
- Using Javascript Class, ES6 version, LocalStorage etc
- and many more but simple 

- it has three simple scripts file and one html file 
# app.js, ui.js, chat.js

<h3>app.js</h3>
<pre>
<code>
// app.js
//dom query
const chatList = document.querySelector('.chat-list');

const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');

const updateMsg = document.querySelector('.update-mssg');

const rooms = document.querySelector('.chat-rooms');

//add new chat 
newChatForm.addEventListener('submit', e => {
        e.preventDefault()
        const message = newChatForm.message.value.trim();

        chatroom.addChat(message)
            .then(() => {
                newChatForm.reset()
            }).catch(error => {
                console.log('error')
            })

    })
    //get local storage for username
const username = (localStorage.username) ? localStorage.getItem('username') : 'sunny';

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

//get the chat and render
chatroom.getChats((data) => {
        console.log(data);
        chatUI.render(data)
    })
    //update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault()

    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName)
    newNameForm.reset()
    console.log(newName);
    updateMsg.innerText = `You name was updated to ${newName}`;
    setTimeout(() => {
        updateMsg.innerText = '';
    }, 3000)
})

//update room
rooms.addEventListener('click', e => {
    console.log(e)
    if (e.target.tagName == 'BUTTON') {
        chatUI.clear()
        chatroom.updateRoom(e.target.getAttribute('id'))
        chatroom.getChats(data => {
            chatUI.render(data)
        })
    }
})
</code>
</pre>


 <h3>ui.js</h3>

<pre>
<code>
// ui.js
//render chat template 

//clear list of chat when switch

class ChatUI {

    constructor(list) {
        this.list = list;

    }
    clear() {
        this.list.innerHTML = '';
    }
    render(data) {

        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(), { addSuffix: true }
        )
        const html = `
        
            <li class="list-group-item">
            
                <span class="username"> ${data.username} </span>
                <span class="message"> ${data.message} </span>
                <div class="time">${when}</div>               

            </li>

        `;
        this.list.innerHTML += html;
    }
}
</code>
</pre>


 <h3>chat.js</h3>

<pre>
<code>
// chat.js
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

</code>
</pre>
