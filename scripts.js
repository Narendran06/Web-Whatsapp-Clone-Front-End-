document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = 'Toggle Dark Mode';
    darkModeToggle.style.position = 'absolute';
    darkModeToggle.style.top = '10px';
    darkModeToggle.style.right = '10px';
    darkModeToggle.style.padding = '10px';
    darkModeToggle.style.backgroundColor = '#009688';
    darkModeToggle.style.color = '#fff';
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.borderRadius = '5px';
    darkModeToggle.style.cursor = 'pointer';
    document.body.appendChild(darkModeToggle);
  
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  
    // Dark Mode CSS
    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = `
      .dark-mode {
        background-color: #333;
        color: #ccc;
      }
      .dark-mode .main-container {
        background: #444;
      }
      .dark-mode .left-container,
      .dark-mode .right-container {
        background: #555;
      }
      .dark-mode .header {
        background: #666;
      }
      .dark-mode .notif-box {
        background: #777;
      }
      .dark-mode .search-container {
        background: #888;
      }
      .dark-mode .chat-box {
        background: #999;
      }
      .dark-mode .chat-container {
        background: #aaa;
      }
      .dark-mode .chatbox-input {
        background: #bbb;
      }
      .dark-mode .message-box p {
        background: #ccc;
      }
      .dark-mode .message-box.friend-message p {
        background: #ddd;
      }
    `;
    document.head.appendChild(darkModeStyles);
  
    // Message Sending Animation
    const chatInput = document.querySelector('.chatbox-input input');
    chatInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    });
  
    function sendMessage() {
      const messageText = chatInput.value.trim();
      if (messageText === '') return;
  
      const messageBox = document.createElement('div');
      messageBox.classList.add('message-box', 'my-message');
  
      const messageContent = document.createElement('p');
      messageContent.textContent = messageText;
      messageBox.appendChild(messageContent);
  
      const timestamp = document.createElement('span');
      const now = new Date();
      timestamp.textContent = `${now.getHours()}:${now.getMinutes()}`;
      messageContent.appendChild(timestamp);
  
      const chatContainer = document.querySelector('.chat-container');
      chatContainer.appendChild(messageBox);
  
      chatInput.value = '';
  
      // Animate the message box
      messageBox.style.opacity = '0';
      messageBox.style.transform = 'translateY(20px)';
      setTimeout(() => {
        messageBox.style.transition = 'all 0.3s';
        messageBox.style.opacity = '1';
        messageBox.style.transform = 'translateY(0)';
      }, 10);
    }
  
    // Typing Indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.textContent = 'Typing...';
    typingIndicator.style.display = 'none';
    typingIndicator.style.position = 'absolute';
    typingIndicator.style.bottom = '80px';
    typingIndicator.style.left = '20px';
    typingIndicator.style.backgroundColor = '#fff';
    typingIndicator.style.padding = '10px';
    typingIndicator.style.borderRadius = '5px';
    typingIndicator.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
    document.body.appendChild(typingIndicator);
  
    chatInput.addEventListener('input', () => {
      typingIndicator.style.display = 'block';
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        typingIndicator.style.display = 'none';
      }, 1000);
    });
  
    let typingTimeout;
  
    // Custom Chat Background
    const bgButton = document.createElement('button');
    bgButton.textContent = 'Change Background';
    bgButton.style.position = 'absolute';
    bgButton.style.top = '10px';
    bgButton.style.left = '10px';
    bgButton.style.padding = '10px';
    bgButton.style.backgroundColor = '#009688';
    bgButton.style.color = '#fff';
    bgButton.style.border = 'none';
    bgButton.style.borderRadius = '5px';
    bgButton.style.cursor = 'pointer';
    document.body.appendChild(bgButton);
  
    bgButton.addEventListener('click', () => {
      const newBgUrl = prompt('Enter the URL of the new background image:');
      if (newBgUrl) {
        document.querySelector('.right-container::before').style.backgroundImage = `url(${newBgUrl})`;
      }
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.querySelector('.chat-container');
    const messageInput = document.querySelector('.chatbox-input input');
    const sendButton = document.querySelector('.chatbox-input .fa-paper-plane');
    const emojiButton = document.querySelector('.chatbox-input .fa-smile');
    const notifCloseButton = document.querySelector('.fa-xmark');
    let chatBox = document.querySelector('.chat-list .chat-box');

    // Helper function to get current time
    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    }

    // Send message
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const messageBox = document.createElement('div');
            messageBox.classList.add('message-box', 'my-message');

            const messageParagraph = document.createElement('p');
            messageParagraph.innerHTML = messageText + `<span>${getCurrentTime()}</span>`;
            messageBox.appendChild(messageParagraph);

            chatContainer.appendChild(messageBox);
            chatContainer.scrollTop = chatContainer.scrollHeight;
            messageInput.value = '';
        }
    }

    // Event listener for send button
    sendButton.addEventListener('click', sendMessage);

    // Event listener for Enter key
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    // Notification close button
    notifCloseButton.addEventListener('click', () => {
        notifCloseButton.closest('.notif-box').style.display = 'none';
    });

    // Emoji Picker
    emojiButton.addEventListener('click', () => {
        const emojiPicker = document.createElement('div');
        emojiPicker.classList.add('emoji-picker');

        const emojis = ['😀', '😂', '😍', '😎', '😭', '😡', '👍', '👎', '❤️', '🔥'];
        emojis.forEach(emoji => {
            const emojiSpan = document.createElement('span');
            emojiSpan.textContent = emoji;
            emojiSpan.style.cursor = 'pointer';
            emojiSpan.style.padding = '5px';
            emojiPicker.appendChild(emojiSpan);

            emojiSpan.addEventListener('click', () => {
                messageInput.value += emoji;
                emojiPicker.remove();
            });
        });

        emojiButton.appendChild(emojiPicker);

        // Remove emoji picker when clicking outside
        document.addEventListener('click', (e) => {
            if (!emojiButton.contains(e.target)) {
                emojiPicker.remove();
            }
        }, { once: true });
    });

    // Highlight the chat box when clicked
    chatBox.addEventListener('click', () => {
        chatBox.classList.add('active');
        setTimeout(() => chatBox.classList.remove('active'), 2000); // Remove the highlight after 2 seconds
    });
});
