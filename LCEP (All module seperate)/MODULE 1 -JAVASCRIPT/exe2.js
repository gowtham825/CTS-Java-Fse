// Exercise 2: Syntax, Data Types, and Operators
// Requirements:

// Use const for event name and date, let for seats
// Concatenate event info using template literals
// Use ++ or -- to manage seat count on registration

/* Syntax, Data Types, and Operators - Exercise 2 */
const eventName = 'Community Garden Workshop';
const eventDate = '2025-06-15';
let availableSeats = 30;

/* Template Literals - Exercise 2 */
const eventInfo = `Event: ${eventName} on ${eventDate}. Available seats: ${availableSeats}`;
console.log(eventInfo);


/* Seat Count Management - Exercise 2 */
function registerUser() {
    if (this.checkAvailability()) {
        this.registrations++;  // Increment registrations
        return true;
    }
    return false;
}

