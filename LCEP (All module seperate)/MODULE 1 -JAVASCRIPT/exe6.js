// Exercise 6: Arrays and Methods
// Requirements:

// Add new events using .push()
// Use .filter() to show only music events
// Use .map() to format display cards

/* Array Push Method - Exercise 6 */
function addEvent(eventData) {
    const newEvent = new Event(/* event parameters */);
    events.push(newEvent);  // Add new event to array
}


/* Array Filter Method - Exercise 6 */
function filterEvents() {
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter ? categoryFilter.value : '';

    if (selectedCategory === '') {
        filteredEvents = [...events];
    } else {
        filteredEvents = events.filter(event => event.category === selectedCategory);
    }
    renderEvents();
}


/* Array Map Method - Exercise 6 */
const EventUtils = {
    formatEventsForDisplay: () => {
        return events.map(event => ({
            ...event,
            displayTitle: `${event.title} - ${event.getFormattedDate()}`,
            priceDisplay: event.price === 0 ? 'Free' : `$${event.price}`,
            availabilityText: event.checkAvailability() ? 'Available' : 'Full'
        }));
    }
};


