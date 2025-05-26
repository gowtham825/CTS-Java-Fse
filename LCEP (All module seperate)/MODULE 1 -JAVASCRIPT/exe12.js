// Exercise 12: AJAX & Fetch API
// Requirements:

// Use fetch() to POST user data to a mock API
// Show success/failure message after submission
// Use setTimeout() to simulate a delayed response

/* Fetch POST Request - Exercise 12 */
async function submitRegistration(userData) {
    try {
        const response = await fetch(PORTAL_CONFIG.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            showConfirmationMessage(userData);
            showNotification('Registration submitted successfully!', 'success');
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Submission error:', error);
        showNotification('Registration failed. Please try again later.', 'danger');
    }
}


/* Success/Failure Messages - Exercise 12 */
function showConfirmationMessage(userData) {
    const output = document.getElementById('confirmationMessage');
    if (output) {
        output.innerHTML = `
            <div class="alert alert-success alert-custom">
                <h5>Registration Successful!</h5>
                <p><strong>Name:</strong> ${userData.name}</p>
                <p><strong>Email:</strong> ${userData.email}</p>
            </div>
        `;
    }
}

/* Simulated Delay - Exercise 12 */
async function submitRegistration(userData) {
    try {
        const response = await fetch(PORTAL_CONFIG.apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (response.ok) {
            showNotification('Registration submitted successfully!', 'success');
        }
    } catch (error) {
        showNotification('Registration failed. Please try again later.', 'danger');
    }
}