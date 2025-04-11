document.addEventListener('DOMContentLoaded', function() {
    // Show chatbox after a delay
    setTimeout(() => {
        document.querySelector('.chat-box').style.display = 'block';
    }, 2000);

    // Chat message sending
    document.querySelector('.chat-box .btn-custom').addEventListener('click', function() {
        sendMessage();
    });

    document.querySelector('.chat-box input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const inputField = document.querySelector('.chat-box input');
        const message = inputField.value.trim();
        
        if (message !== '') {
            appendMessage('user', message);
            inputField.value = '';
            showTypingIndicator();
            
            setTimeout(() => {
                hideTypingIndicator();
                appendMessage('bot', getBotResponse(message));
            }, 1000);
        }
    }

    function appendMessage(sender, message) {
        const chatBody = document.querySelector('.chat-body');
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.innerHTML = `
            <div class="message-content">
                <span class="avatar">${sender === 'user' ? '👤' : '🤖'}</span>
                <div class="text">${message}</div>
                <span class="timestamp">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showTypingIndicator() {
        const chatBody = document.querySelector('.chat-body');
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.innerHTML = '🤖 Agent is typing...';
        chatBody.appendChild(typingIndicator);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) typingIndicator.remove();
    }

    function getBotResponse(userMessage) {
        const responses = {
            'hello': 'Hi there! How can I help you today?',
            'how are you': 'I am just a bot, but I am functioning perfectly! 😊',
            'bye': 'Goodbye! Have a great day!'
        };
        return responses[userMessage.toLowerCase()] || "I'm not sure, but I'll find out for you!";
    }

    // Toggle chatbox visibility
    document.querySelector('.chat-header').addEventListener('click', function() {
        document.querySelector('.chat-box').classList.toggle('collapsed');
    });
});
