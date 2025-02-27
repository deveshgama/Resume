// login.js
const statusText = document.querySelector('.status');
// Function to handle form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form values
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (!userId || !password) {
        statusText.textContent = 'Please enter both User ID and Password.';
        return;
    }

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user exists and credentials match
    const user = users.find(user => user.userId === userId && user.password === password);

    if (user) {
        // Redirect to the dashboard or another page
        statusText.textContent = 'Login successful. Redirecting...';
        setTimeout(() => {
            window.location.href = 'dashboard.html'; // Replace with your desired page
        }, 500);
    } else {
        // Show error message
        statusText.textContent = 'Invalid User ID or Password.';
    }
});