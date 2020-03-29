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