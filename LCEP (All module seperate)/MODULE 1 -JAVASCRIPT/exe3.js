// Exercise 3: Conditionals, Loops, and Error Handling
// Requirements:

// Use if-else to hide past or full events
// Loop through the event list and display using forEach()
// Wrap registration logic in try-catch to handle errors

/* Conditionals for Event Filtering - Exercise 3 */
function renderEvents(eventsToRender = filteredEvents) {
    eventsToRender.forEach((event, index) => {
        // Hide past or full events
        if (new Date(event.date) < new Date() || !event.checkAvailability()) {
            return; // Skip this event
        }
        const eventCard = createEventCard(event, index);
        container.appendChild(eventCard);
    });
}


/* Loop Through Events - Exercise 3 */
events.forEach((event, index) => {
    setTimeout(() => {
        card.classList.add('fade-in-up');
    }, index * 100);
});




/* Error Handling - Exercise 3 */
function registerForEvent(eventId) {
    try {
        const event = events.find(e => e.id === eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        if (!event.checkAvailability()) {
            showNotification('Sorry, this event is fully booked!', 'warning');
            return;
        }
        const success = event.registerUser();
        if (success) {
            showNotification(`Successfully registered for ${event.title}!`, 'success');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('Registration failed. Please try again.', 'danger');
    }
}