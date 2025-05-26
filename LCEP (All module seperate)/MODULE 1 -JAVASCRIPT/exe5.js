// Exercise 5: Objects and Prototypes
// Requirements:

// Define Event constructor or class
// Add checkAvailability() to prototype
// List object keys and values using Object.entries()


/* Event Class Definition - Exercise 5 */
class Event {
    constructor(id, title, description, category, date, location, price, seats, image) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.date = date;
        this.location = location;
        this.price = price;
        this.seats = seats;
        this.image = image;
        this.registrations = 0;
    }

    checkAvailability() {
        return this.seats > this.registrations;
    }

    registerUser() {
        if (this.checkAvailability()) {
            this.registrations++;
            return true;
        }
        return false;
    }
}


/* Object Manipulation - Exercise 5 */
const UserManager = {
    getUserStats: function(userId) {
        const user = this.users.get(userId);
        if (!user) return null;
        
        // Using Object.entries() to iterate over object properties
        Object.entries(user).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    }
};
