function toggleChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.style.display = chatBox.style.display === 'none' ? 'block' : 'none';
    // Scroll to the chat box
    chatBox.scrollIntoView({ behavior: 'smooth' });
    // Move cursor to the chat input
    document.getElementById('chat-input').focus();
}

function generateResponse(userMessage) {
    // Simple keyword-based response
    if (userMessage.includes('hello')) {
        return 'Hi there! How can I help you today?';
    } else if (userMessage.includes('help')) {
        return 'Sure! What do you need help with?';
    } 
    else if(userMessage.includes('hi')){
        return 'Hello there! How Can I help you today?'
    }
    else {
        return 'I\'m not sure how to respond to that. Can you ask something else?';
    }
}
    

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value;
    if (message.trim() !== '') {
        const messagesContainer = document.getElementById('chat-messages');
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
        // Generate and display response
        const response = generateResponse(message);
        const responseElement = document.createElement('p');
        responseElement.textContent = response;
        messagesContainer.appendChild(responseElement);
        input.value = ''; // Clear the input
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
        }
    }

// Add event listener for the Enter key
document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
        event.preventDefault(); // Prevent the default action (e.g., form submission)
    }
});
document.addEventListener('keydown', function(event) {
    const chatBox = document.getElementById('chat-box');
    if (event.key === 'Escape' && chatBox.style.display === 'block') {
        toggleChat(); // Call the function to toggle chat visibility only if it's open
    }
});