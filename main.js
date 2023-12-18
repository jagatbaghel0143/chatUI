const chatList = document.getElementById('chatList');

async function fetchChatData() {
  try {
    const response = await fetch('https://my-json-server.typicode.com/codebuds-fk/chat/chats');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chat data:', error);
    return [];
  }
}

function createChatList(chatData) {
  chatList.innerHTML = '';
  chatData.sort((a, b) => a.orderId - b.orderId);

  chatData.forEach(chat => {
    const listItem = document.createElement('li');
    listItem.classList.add('chat-item');

    const image = document.createElement('img');
    image.src = chat.imageURL;
    image.classList.add('chat-image');

    listItem.appendChild(image);

    const chatDetails = document.createElement('div');
    chatDetails.classList.add('chat-details');

    const title = document.createElement('h3');
    title.textContent = chat.title;
    const orderId = document.createElement('p');
    orderId.textContent = `Order ID: ${chat.orderId}`;

    const recentMessage = document.createElement('p');
    if(chat.messageList.length > 0) {
        recentMessage.textContent = chat.messageList[chat.messageList.length-1].message;
    }

    chatDetails.appendChild(title);
    chatDetails.appendChild(orderId);
    chatDetails.appendChild(recentMessage);

    listItem.appendChild(chatDetails);    
    listItem.dataset.chatId = chat.id;

    listItem.addEventListener('click', handleChatItemClick);

    chatList.appendChild(listItem);
  });
}

function showChatDetails(chatId) {

    chatDetails.innerHTML = `Display chat details for chat ID: ${chatId}`;
  }

function handleChatItemClick(event) {
    const clickedListItem = event.target.closest('.chat-item');
    if (clickedListItem) {
      const chatId = clickedListItem.dataset.chatId;
      if (chatId) {
          window.location.href = `chat.html?id=${chatId}`;
          const chatDetails = document.getElementById('chatDetails');
          chatDetails.innerHTML='';

        console.log(chatId);
        let chatData = JSON.parse(localStorage.getItem("chats"));
        chatData.forEach( chat => {
            if(chat.id == chatId) {
                console.log(chat);
                if(chat.messageList.length > 0) {
                    chat.messageList.forEach( m => {
                        const msg = document.createElement('p');
                        msg.textContent = m.message;
                        chatDetails.appendChild(msg);
                    })
                }
                return;
            }
        })
      } else {
        chatDetails.innerHTML='';
        const empty = document.createElement('h3');
        empty.innerText = "Start Chat";
        chatDetails.appendChild(empty);
      }
    }
}

fetchChatData()
  .then(data => {
    localStorage.setItem("chats", JSON.stringify(data));
    createChatList(data);
  });
