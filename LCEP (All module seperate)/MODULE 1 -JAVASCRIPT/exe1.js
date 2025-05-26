// Exercise 1: JavaScript Basics & Setup
// Requirements:

// Use <script src="main.js"></script> in HTML
// Log "Welcome to the Community Portal" using console.log()
// Use an alert to notify when the page is fully loaded


<script src="script.js"></script>


// JavaScript Basics & Setup - Exercise 1
function initializePortal() {
    console.log('Welcome to the Community Portal');
    // Other initialization code...
}


// Page Load Alert - Exercise 1
{/* <body onload="initializePortal()"> */}
// And in the function:
setTimeout(() => {
    alert('Welcome to the Community Portal! Page fully loaded.');
}, 1000);

