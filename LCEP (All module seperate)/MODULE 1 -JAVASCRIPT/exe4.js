// Exercise 4: Functions, Scope, Closures, Higher-Order Functions
// Requirements:

// Create addEvent(), registerUser(), filterEventsByCategory()
// Use closure to track total registrations for a category
// Pass callbacks to filter functions for dynamic search

/* Function Definitions - Exercise 4 */
function addEvent(eventData) {
    const newEvent = new Event(
        events.length + 1,
        eventData.title,
        eventData.description,
        eventData.category,
        eventData.date,
        eventData.location,
        eventData.price,
        eventData.seats,
        eventData.image
    );
    events.push(newEvent);
    renderEvents();
}

function filterEventsByCategory(category) {
    if (category === '') {
        filteredEvents = [...events];
    } else {
        filteredEvents = events.filter(event => event.category === category);
    }
    renderEvents();
}


/* Closure for Registration Tracking - Exercise 4 */
const createRegistrationTracker = () => {
    const registrations = new Map();
    
    return {
        addRegistration: (category) => {
            const current = registrations.get(category) || 0;
            registrations.set(category, current + 1);
        },
        getRegistrations: (category) => registrations.get(category) || 0,
        getTotalRegistrations: () => {
            let total = 0;
            for (let count of registrations.values()) {
                total += count;
            }
            return total;
        }
    };
};

const registrationTracker = createRegistrationTracker();



/* Higher-Order Functions - Exercise 4 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedSearch = debounce(performSearch, 300);