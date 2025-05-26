// Exercise 9: Async JS, Promises, Async/Await
// Requirements:

// Fetch events from a mock JSON endpoint
// Use .then() and .catch() to handle results
// Rewrite using async/await and show loading spinner


/* Promise-based Fetch - Exercise 9 */
function fetchEventsWithPromises() {
    fetch(`${PORTAL_CONFIG.apiEndpoint}?_limit=3`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Events fetched with promises:', data);
            showNotification('Additional events loaded via promises!', 'info');
        })
        .catch(error => {
            console.error('Promise-based fetch error:', error);
            showNotification('Failed to load events via promises', 'danger');
        });
}


/* Async/Await Implementation - Exercise 9 */
async function fetchEventsFromAPI() {
    try {
        showNotification('Loading events...', 'info');
        
        const response = await fetch(`${PORTAL_CONFIG.apiEndpoint}?_limit=6`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts = await response.json();
        
        // Transform API data to event format
        const apiEvents = posts.map((post, index) => {
            // Transformation logic...
        });
        
        events = [...sampleEvents, ...apiEvents];
        filteredEvents = [...events];
        renderEvents();
        
        showNotification('Events loaded successfully!', 'success');
        
    } catch (error) {
        console.error('Failed to fetch events:', error);
        showNotification('Failed to load additional events', 'warning');
    }
}


/* Async/Await Implementation - Exercise 9 */
async function fetchEventsFromAPI() {
    try {
        showNotification('Loading events...', 'info');
        
        const response = await fetch(`${PORTAL_CONFIG.apiEndpoint}?_limit=6`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts = await response.json();
        
        // Transform API data to event format
        const apiEvents = posts.map((post, index) => {
            // Transformation logic...
        });
        
        events = [...sampleEvents, ...apiEvents];
        filteredEvents = [...events];
        renderEvents();
        
        showNotification('Events loaded successfully!', 'success');
        
    } catch (error) {
        console.error('Failed to fetch events:', error);
        showNotification('Failed to load additional events', 'warning');
    }
}

