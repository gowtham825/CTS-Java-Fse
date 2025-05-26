// Exercise 10: Modern JavaScript Features
// Requirements:

// Use let, const, default parameters in functions
// Use destructuring to extract event details
// Use spread operator to clone event list before filtering

/* Default Parameters - Exercise 10 */
function renderEvents(eventsToRender = filteredEvents) {
    const container = document.getElementById('eventsContainer');
    // Function logic...
}

function showNotification(message, type = 'info') {
    // Notification logic...
}

/* Destructuring - Exercise 10 */
function findNearbyEvents() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;  // Destructuring
            showNotification(`Location found! Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
        }
    );
}

// Form data destructuring
const userData = {
    name: formData.get('userName') || '',
    email: formData.get('userEmail') || '',
    phone: formData.get('phoneNumber') || ''
};

/* Spread Operator - Exercise 10 */
function filterEvents() {
    if (selectedCategory === '') {
        filteredEvents = [...events];  // Clone array using spread
    } else {
        filteredEvents = events.filter(event => event.category === selectedCategory);
    }
}

// Sample events initialization
let events = [...sampleEvents];