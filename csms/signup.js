// signup.js
const statusText = document.querySelector('.status');
// Function to handle form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form values
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    // Basic validation
    if (!userId || !password || !name) {
        statusText.textContent = 'Please enter all fields.';
        return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.userId === userId);

    if (userExists) {
        statusText.textContent = 'User already exists. Please login.';
        return;
    }

    // Create a new user object
    const newUser  = {
        userId: userId,
        password: password,
        name: name
    };

    // Add the new user to the list of users
    users.push(newUser );

    // Save the updated list of users to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Notify the user and redirect to the login page
    statusText.textContent = 'User created successfully. Redirecting to login page...';
    setTimeout(() => {
    window.location.href = 'login.html';
    }, 500);
});