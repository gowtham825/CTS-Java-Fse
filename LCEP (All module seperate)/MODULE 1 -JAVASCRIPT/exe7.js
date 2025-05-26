// Exercise 7: DOM Manipulation
// Requirements:

// Access DOM elements using querySelector()
// Create and append event cards using createElement()
// Update UI when user registers or cancels

/* DOM Element Access - Exercise 7 */
function renderEvents(eventsToRender = filteredEvents) {
    const container = document.getElementById('eventsContainer');
    const searchInput = document.getElementById('searchEvents');
    const categoryFilter = document.querySelector('#categoryFilter');
}


/* DOM Element Creation - Exercise 7 */
function createEventCard(event, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 col-sm-12';
    
    col.innerHTML = `
        <div class="card eventCard h-100" data-category="${event.category}">
            <!-- Card content -->
        </div>
    `;
    
    return col;
}

function renderEvents() {
    container.innerHTML = '';
    eventsToRender.forEach((event, index) => {
        const eventCard = createEventCard(event, index);
        container.appendChild(eventCard);  // Append to DOM
    });
}


/* UI Update on Registration - Exercise 7 */
function registerForEvent(eventId) {
    // Registration logic...
    if (success) {
        renderEvents(); // Re-render to update availability
        showNotification(`Successfully registered!`, 'success');
    }
}