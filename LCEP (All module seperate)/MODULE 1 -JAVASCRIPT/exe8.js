// Exercise 8: Event Handling
// Requirements:

// Use onclick for "Register" buttons
// Use onchange to filter events by category
// Use keydown to allow quick search by name

/* OnClick Event Handling - Exercise 8 */
// In HTML:
<button class="btn btn-primary w-100" onclick="registerForEvent(${event.id})">
    Register Now
</button>


/* OnChange Event Handling - Exercise 8 */
// In HTML:
{/* <select class="form-select" id="categoryFilter" onchange="filterEvents()">
    <option value="">All Categories</option>
    <option value="workshop">Workshops</option>
</select> */}

function filterEvents() {
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter.value;
    // Filter logic...
}

/* KeyDown Event Handling - Exercise 8 */
// In HTML:
{/* <input type="text" id="searchEvents" onkeydown="searchEvents(event)"> */}

function searchEvents(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

