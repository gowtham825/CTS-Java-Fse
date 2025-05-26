// ========================================
// COMMUNITY EVENT PORTAL JAVASCRIPT
// Modern ES6+ Features Implementation
// ========================================

// Modern JavaScript Features - Exercise 10
const PORTAL_CONFIG = {
    apiEndpoint: 'https://jsonplaceholder.typicode.com/posts',
    maxEvents: 12,
    defaultCategory: 'all',
    animationDuration: 300
};

// Event Data Structure - Exercise 5
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

    // Check availability method - Exercise 5
    checkAvailability() {
        return this.seats > this.registrations;
    }

    // Register user method
    registerUser() {
        if (this.checkAvailability()) {
            this.registrations++;
            return true;
        }
        return false;
    }

    // Get formatted date
    getFormattedDate() {
        return new Date(this.date).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Sample Events Data
const sampleEvents = [
    new Event(1, 'Community Garden Workshop', 'Learn sustainable gardening techniques and start your own community garden plot.', 'workshop', '2025-06-15', 'Central Park', 25, 30, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop'),
    new Event(2, 'Summer Music Festival', 'Annual outdoor music festival featuring local bands and food vendors.', 'music', '2025-07-04', 'City Square', 15, 500, 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=250&fit=crop'),
    new Event(3, 'Basketball Tournament', 'Competitive basketball tournament for all age groups with prizes.', 'sports', '2025-06-28', 'Community Center', 10, 64, 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop'),
    new Event(4, 'Town Hall Meeting', 'Monthly community meeting to discuss local issues and improvements.', 'community', '2025-06-10', 'City Hall', 0, 100, 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop'),
    new Event(5, 'Cooking Class: Italian Cuisine', 'Learn to make authentic Italian dishes with Chef Marco.', 'workshop', '2025-06-20', 'Culinary Institute', 45, 20, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop'),
    new Event(6, 'Jazz Night', 'Intimate jazz performance featuring local musicians.', 'music', '2025-06-25', 'Downtown Cafe', 20, 50, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop')
];

// Global Variables
let events = [...sampleEvents];
let filteredEvents = [...events];
let userPreferences = {};

// Closure for tracking registrations - Exercise 4
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

// Initialize Portal - Exercise 1
function initializePortal() {
    console.log('Welcome to the Community Portal');
    loadUserPreferences();
    renderEvents();
    setupEventListeners();
    setupScrollEffects();
    
    // Show welcome alert
    setTimeout(() => {
        showNotification('Welcome to the Community Portal! 🎉', 'success');
    }, 1000);
}

// Setup Event Listeners - Exercise 8
function setupEventListeners() {
    // Navigation scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Form validation
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('input', validateFormField);
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchEvents');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
    }
}

// Scroll Effects
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
}

// Debounce Function - Higher-Order Function - Exercise 4
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

// DOM Manipulation - Exercise 7
function renderEvents(eventsToRender = filteredEvents) {
    const container = document.getElementById('eventsContainer');
    if (!container) return;

    container.innerHTML = '';

    if (eventsToRender.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <h4>No events found</h4>
                    <p>Try adjusting your search criteria or check back later for new events.</p>
                </div>
            </div>
        `;
        return;
    }

    eventsToRender.forEach((event, index) => {
        const eventCard = createEventCard(event, index);
        container.appendChild(eventCard);
    });

    // Add animation to cards
    setTimeout(() => {
        const cards = container.querySelectorAll('.eventCard');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in-up');
            }, index * 100);
        });
    }, 50);
}

// Create Event Card - Exercise 7
function createEventCard(event, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 col-sm-12';
    
    const availability = event.checkAvailability();
    const spotsLeft = event.seats - event.registrations;
    
    col.innerHTML = `
        <div class="card eventCard h-100" data-category="${event.category}">
            <img src="${event.image}" class="card-img-top" alt="${event.title}" loading="lazy">
            <div class="card-body d-flex flex-column">
                <div class="event-badge mb-2">${event.category}</div>
                <h5 class="card-title">${event.title}</h5>
                <p class="card-text">${event.description}</p>
                
                <div class="event-meta">
                    <div><i class="bi bi-calendar me-1"></i>${event.getFormattedDate()}</div>
                    <div><i class="bi bi-geo-alt me-1"></i>${event.location}</div>
                </div>
                
                <div class="event-meta">
                    <div><i class="bi bi-currency-dollar me-1"></i>${event.price === 0 ? 'Free' : '$' + event.price}</div>
                    <div><i class="bi bi-people me-1"></i>${spotsLeft} spots left</div>
                </div>
                
                <div class="mt-auto">
                    ${availability ? 
                        `<button class="btn btn-primary w-100" onclick="registerForEvent(${event.id})">
                            <i class="bi bi-calendar-plus me-2"></i>Register Now
                        </button>` :
                        `<button class="btn btn-secondary w-100" disabled>
                            <i class="bi bi-calendar-x me-2"></i>Event Full
                        </button>`
                    }
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Event Registration - Exercise 3, 4
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
            registrationTracker.addRegistration(event.category);
            showNotification(`Successfully registered for ${event.title}!`, 'success');
            renderEvents(); // Re-render to update availability
            
            // Analytics tracking
            console.log(`Registration successful for event: ${event.title}`);
            console.log(`Total registrations for ${event.category}: ${registrationTracker.getRegistrations(event.category)}`);
        } else {
            throw new Error('Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('Registration failed. Please try again.', 'danger');
    }
}

// Filter Events - Exercise 6
function filterEvents() {
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter ? categoryFilter.value : '';

    if (selectedCategory === '') {
        filteredEvents = [...events];
    } else {
        // Using filter method - Exercise 6
        filteredEvents = events.filter(event => event.category === selectedCategory);
    }

    renderEvents();
    
    // Show filter results
    const resultCount = filteredEvents.length;
    const category = selectedCategory || 'all';
    showNotification(`Showing ${resultCount} ${category} events`, 'info');
}

// Search Events - Exercise 8
function searchEvents(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchEvents');
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

    if (searchTerm === '') {
        filteredEvents = [...events];
    } else {
        filteredEvents = events.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm)
        );
    }

    renderEvents();
}

// Form Handling - Exercise 11
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Form validation
    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    // Extract form data using destructuring - Exercise 10
    const userData = {
        name: formData.get('userName') || '',
        email: formData.get('userEmail') || '',
        phone: formData.get('phoneNumber') || '',
        date: formData.get('eventDate') || '',
        eventType: formData.get('eventType') || '',
        feedback: formData.get('feedback') || ''
    };

    // Simulate AJAX submission - Exercise 12
    submitRegistration(userData);
}

// AJAX & Fetch API - Exercise 12
async function submitRegistration(userData) {
    const submitBtn = document.querySelector('#registrationForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    try {
        // Show loading state
        submitBtn.innerHTML = '<span class="loading-spinner me-2"></span>Processing...';
        submitBtn.disabled = true;

        // Simulate API call with timeout - Exercise 12
        const response = await fetch(PORTAL_CONFIG.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (response.ok) {
            showConfirmationMessage(userData);
            document.getElementById('registrationForm').reset();
            showNotification('Registration submitted successfully!', 'success');
        } else {
            throw new Error('Network response was not ok');
        }

    } catch (error) {
        console.error('Submission error:', error);
        showNotification('Registration failed. Please try again later.', 'danger');
    } finally {
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Form Validation - Exercise 11
function validateFormField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Real-time validation
    if (field.hasAttribute('required') && !value) {
        field.setCustomValidity('This field is required');
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        field.setCustomValidity('Please enter a valid email address');
    } else {
        field.setCustomValidity('');
    }
    
    // Visual feedback
    if (field.checkValidity()) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
    }
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone Validation - Exercise 6
function validatePhone() {
    const phoneInput = document.getElementById('phoneNumber');
    const phone = phoneInput.value.trim();
    
    // Simple phone validation
    const phoneRegex = /^[\(\)\-\s\d]+$/;
    
    if (phone && !phoneRegex.test(phone)) {
        phoneInput.setCustomValidity('Invalid phone number format');
        phoneInput.classList.add('is-invalid');
        showNotification('Please enter a valid phone number', 'warning');
    } else {
        phoneInput.setCustomValidity('');
        phoneInput.classList.remove('is-invalid');
        if (phone) phoneInput.classList.add('is-valid');
    }
}

// Event Type Fee Display - Exercise 6
function showEventFee() {
    const eventTypeSelect = document.getElementById('eventType');
    const feeDisplay = document.getElementById('eventFee');
    
    if (!eventTypeSelect || !feeDisplay) return;
    
    const selectedOption = eventTypeSelect.selectedOptions[0];
    if (selectedOption && selectedOption.value) {
        const feeText = selectedOption.textContent.match(/\([^)]+\)/);
        feeDisplay.textContent = feeText ? `Fee: ${feeText[0]}` : '';
        feeDisplay.style.display = 'block';
    } else {
        feeDisplay.style.display = 'none';
    }
}

// Character Counter - Exercise 6
function countCharacters() {
    const textarea = document.getElementById('feedback');
    const counter = document.getElementById('charCount');
    
    if (!textarea || !counter) return;
    
    const currentLength = textarea.value.length;
    const maxLength = 500;
    
    counter.textContent = currentLength;
    
    if (currentLength > maxLength) {
        counter.style.color = 'var(--danger-color)';
        textarea.value = textarea.value.substring(0, maxLength);
        counter.textContent = maxLength;
    } else if (currentLength > maxLength * 0.8) {
        counter.style.color = 'var(--warning-color)';
    } else {
        counter.style.color = 'var(--text-secondary)';
    }
}

// Show Confirmation - Exercise 5, 6
function showConfirmation() {
    const confirmation = document.getElementById('confirmationMessage');
    if (confirmation) {
        confirmation.innerHTML = `
            <div class="alert alert-success alert-custom mt-3">
                <i class="bi bi-check-circle me-2"></i>
                <strong>Registration Confirmed!</strong> We'll send you a confirmation email shortly.
            </div>
        `;
    }
}

function showConfirmationMessage(userData) {
    const output = document.getElementById('confirmationMessage');
    if (output) {
        output.innerHTML = `
            <div class="alert alert-success alert-custom">
                <h5><i class="bi bi-check-circle me-2"></i>Registration Successful!</h5>
                <p><strong>Name:</strong> ${userData.name}</p>
                <p><strong>Email:</strong> ${userData.email}</p>
                <p><strong>Event Type:</strong> ${userData.eventType}</p>
                <p><strong>Date:</strong> ${userData.date}</p>
                <small class="text-muted">Confirmation details have been sent to your email.</small>
            </div>
        `;
    }
}

// Local Storage Management - Exercise 8
function savePreferences() {
    const eventType = document.getElementById('eventType');
    const categoryFilter = document.getElementById('categoryFilter');
    
    const preferences = {
        preferredEventType: eventType ? eventType.value : '',
        preferredCategory: categoryFilter ? categoryFilter.value : '',
        savedAt: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('communityPortalPreferences', JSON.stringify(preferences));
        sessionStorage.setItem('lastActivity', new Date().toISOString());
        
        showSavedPreferences();
        showNotification('Preferences saved successfully!', 'success');
    } catch (error) {
        console.error('Failed to save preferences:', error);
        showNotification('Failed to save preferences', 'danger');
    }
}

function loadUserPreferences() {
    try {
        const saved = localStorage.getItem('communityPortalPreferences');
        if (saved) {
            userPreferences = JSON.parse(saved);
            
            // Apply saved preferences
            const eventType = document.getElementById('eventType');
            const categoryFilter = document.getElementById('categoryFilter');
            
            if (eventType && userPreferences.preferredEventType) {
                eventType.value = userPreferences.preferredEventType;
                showEventFee();
            }
            
            if (categoryFilter && userPreferences.preferredCategory) {
                categoryFilter.value = userPreferences.preferredCategory;
                filterEvents();
            }
            
            showSavedPreferences();
        }
    } catch (error) {
        console.error('Failed to load preferences:', error);
    }
}

function clearPreferences() {
    try {
        localStorage.removeItem('communityPortalPreferences');
        sessionStorage.removeItem('lastActivity');
        
        // Reset form values
        const eventType = document.getElementById('eventType');
        const categoryFilter = document.getElementById('categoryFilter');
        
        if (eventType) eventType.value = '';
        if (categoryFilter) categoryFilter.value = '';
        
        userPreferences = {};
        showSavedPreferences();
        showNotification('Preferences cleared successfully!', 'info');
        
        // Reset events display
        filteredEvents = [...events];
        renderEvents();
    } catch (error) {
        console.error('Failed to clear preferences:', error);
    }
}

function showSavedPreferences() {
    const display = document.getElementById('savedPreferences');
    if (!display) return;
    
    if (Object.keys(userPreferences).length > 0) {
        display.innerHTML = `
            <small>
                <i class="bi bi-info-circle me-1"></i>
                Saved: ${userPreferences.preferredEventType || 'Any'} events, 
                ${userPreferences.preferredCategory || 'All'} categories
                <br>Last saved: ${userPreferences.savedAt ? new Date(userPreferences.savedAt).toLocaleDateString() : 'Unknown'}
            </small>
        `;
    } else {
        display.innerHTML = '<small class="text-muted">No preferences saved</small>';
    }
}

// Geolocation - Exercise 9
function findNearbyEvents() {
    const button = event.target;
    const originalText = button.innerHTML;
    
    if (!navigator.geolocation) {
        showNotification('Geolocation is not supported by this browser', 'warning');
        return;
    }
    
    button.innerHTML = '<span class="loading-spinner me-2"></span>Finding...';
    button.disabled = true;
    
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
    };
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            
            showNotification(
                `Location found! Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}. Showing nearby events.`,
                'success'
            );
            
            // Simulate filtering by location (in real app, would calculate distances)
            const nearbyEvents = events.slice(0, 3);
            filteredEvents = nearbyEvents;
            renderEvents();
            
            button.innerHTML = originalText;
            button.disabled = false;
        },
        (error) => {
            let message = 'Unable to retrieve location';
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    message = 'Location access denied by user';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = 'Location information unavailable';
                    break;
                case error.TIMEOUT:
                    message = 'Location request timed out';
                    break;
            }
            
            showNotification(message, 'warning');
            button.innerHTML = originalText;
            button.disabled = false;
        },
        options
    );
}

//
// Video Event Handler - Exercise 7
function videoReady() {
    const videoStatus = document.getElementById('videoStatus');
    if (videoStatus) {
        videoStatus.style.display = 'block';
        setTimeout(() => {
            videoStatus.style.display = 'none';
        }, 3000);
    }
}

// Image Enlargement - Exercise 4
function enlargeImage(img) {
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    const enlargedImg = document.getElementById('enlargedImage');
    
    if (enlargedImg) {
        enlargedImg.src = img.src;
        enlargedImg.alt = img.alt;
    }
    
    modal.show();
}

// Smooth Scrolling Functions
function scrollToEvents() {
    document.getElementById('events').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Close modal if called from modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    if (modal) modal.hide();
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-custom position-fixed`;
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // Icon mapping
    const icons = {
        success: 'bi-check-circle',
        warning: 'bi-exclamation-triangle',
        danger: 'bi-x-circle',
        info: 'bi-info-circle'
    };
    
    notification.innerHTML = `
        <i class="bi ${icons[type]} me-2"></i>
        ${message}
        <button type="button" class="btn-close btn-close-white ms-auto" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Async Data Fetching - Exercise 9
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
            const categories = ['workshop', 'music', 'sports', 'community'];
            const category = categories[index % categories.length];
            const baseDate = new Date();
            baseDate.setDate(baseDate.getDate() + (index + 1) * 7);
            
            return new Event(
                post.id + 100, // Offset to avoid conflicts
                post.title.substring(0, 50),
                post.body.substring(0, 100) + '...',
                category,
                baseDate.toISOString().split('T')[0],
                `Venue ${index + 1}`,
                Math.floor(Math.random() * 50),
                Math.floor(Math.random() * 100) + 20,
                `https://picsum.photos/400/250?random=${post.id}`
            );
        });
        
        // Add to events array
        events = [...sampleEvents, ...apiEvents];
        filteredEvents = [...events];
        renderEvents();
        
        showNotification('Events loaded successfully!', 'success');
        
    } catch (error) {
        console.error('Failed to fetch events:', error);
        showNotification('Failed to load additional events', 'warning');
    }
}

// Promise-based approach - Exercise 9
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

// jQuery Integration - Exercise 14
function initializeJQuery() {
    // Check if jQuery is available
    if (typeof $ !== 'undefined') {
        console.log('jQuery is available');
        
        // jQuery event handlers
        $('#registerBtn').click(function() {
            console.log('Register button clicked via jQuery');
        });
        
        // jQuery animations
        $('.eventCard').hover(
            function() {
                $(this).fadeOut(100).fadeIn(100);
            }
        );
        
        // Note: Modern frameworks like React or Vue provide better state management,
        // component reusability, and more maintainable code structure compared to jQuery
    } else {
        console.log('jQuery not available - using vanilla JavaScript');
    }
}

// Setup Scroll Effects
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Error Handling - Exercise 3
function handleError(error, context = 'Operation') {
    console.error(`${context} failed:`, error);
    
    const errorMessages = {
        'NetworkError': 'Network connection failed. Please check your internet connection.',
        'TypeError': 'Invalid data format received.',
        'ValidationError': 'Please check your input and try again.',
        'default': 'An unexpected error occurred. Please try again.'
    };
    
    const message = errorMessages[error.name] || errorMessages.default;
    showNotification(message, 'danger');
}

// Data Validation Utilities
const ValidationUtils = {
    isValidDate: (dateString) => {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date) && date > new Date();
    },
    
    isValidPhone: (phone) => {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    },
    
    sanitizeInput: (input) => {
        return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                   .replace(/[<>]/g, '');
    }
};

// Performance Monitoring
const PerformanceMonitor = {
    startTime: performance.now(),
    
    logPageLoad: () => {
        window.addEventListener('load', () => {
            const loadTime = performance.now() - PerformanceMonitor.startTime;
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        });
    },
    
    measureFunction: (func, name) => {
        return function(...args) {
            const start = performance.now();
            const result = func.apply(this, args);
            const end = performance.now();
            console.log(`${name} executed in ${(end - start).toFixed(2)}ms`);
            return result;
        };
    }
};

// Initialize performance monitoring
PerformanceMonitor.logPageLoad();

// Advanced Array Methods - Exercise 6
const EventUtils = {
    // Filter events by multiple criteria
    filterEventsByCriteria: (criteria) => {
        return events.filter(event => {
            return Object.entries(criteria).every(([key, value]) => {
                if (!value) return true;
                return event[key]?.toString().toLowerCase().includes(value.toLowerCase());
            });
        });
    },
    
    // Map events to display format
    formatEventsForDisplay: () => {
        return events.map(event => ({
            ...event,
            displayTitle: `${event.title} - ${event.getFormattedDate()}`,
            priceDisplay: event.price === 0 ? 'Free' : `$${event.price}`,
            availabilityText: event.checkAvailability() ? 'Available' : 'Full'
        }));
    },
    
    // Sort events by date
    sortEventsByDate: () => {
        return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    
    // Group events by category
    groupEventsByCategory: () => {
        return events.reduce((groups, event) => {
            const category = event.category;
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(event);
            return groups;
        }, {});
    },
    
    // Get event statistics
    getEventStats: () => {
        const totalEvents = events.length;
        const totalSeats = events.reduce((sum, event) => sum + event.seats, 0);
        const totalRegistrations = events.reduce((sum, event) => sum + event.registrations, 0);
        const categories = [...new Set(events.map(event => event.category))];
        
        return {
            totalEvents,
            totalSeats,
            totalRegistrations,
            availableSeats: totalSeats - totalRegistrations,
            categories: categories.length,
            categoryList: categories
        };
    }
};

// Object Manipulation - Exercise 5
const UserManager = {
    users: new Map(),
    
    addUser: function(userData) {
        const userId = Date.now().toString();
        const user = {
            id: userId,
            ...userData,
            registeredEvents: [],
            createdAt: new Date().toISOString()
        };
        
        this.users.set(userId, user);
        return userId;
    },
    
    getUserById: function(userId) {
        return this.users.get(userId);
    },
    
    registerUserForEvent: function(userId, eventId) {
        const user = this.users.get(userId);
        const event = events.find(e => e.id === eventId);
        
        if (user && event && event.checkAvailability()) {
            if (!user.registeredEvents.includes(eventId)) {
                user.registeredEvents.push(eventId);
                event.registerUser();
                return true;
            }
        }
        return false;
    },
    
    getUserStats: function(userId) {
        const user = this.users.get(userId);
        if (!user) return null;
        
        const registeredEvents = user.registeredEvents.map(eventId => 
            events.find(e => e.id === eventId)
        ).filter(Boolean);
        
        const categoryCounts = registeredEvents.reduce((counts, event) => {
            counts[event.category] = (counts[event.category] || 0) + 1;
            return counts;
        }, {});
        
        return {
            totalRegistrations: registeredEvents.length,
            categoryCounts,
            upcomingEvents: registeredEvents.filter(event => new Date(event.date) > new Date())
        };
    }
};

// Accessibility Helpers
const AccessibilityUtils = {
    announceToScreenReader: (message) => {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    },
    
    setupKeyboardNavigation: () => {
        document.addEventListener('keydown', (e) => {
            // Skip to main content with Alt+S
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                document.getElementById('events')?.focus();
                AccessibilityUtils.announceToScreenReader('Skipped to main content');
            }
            
            // Toggle high contrast mode with Alt+H
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                document.body.classList.toggle('high-contrast');
                AccessibilityUtils.announceToScreenReader('High contrast mode toggled');
            }
        });
    }
};

// Initialize accessibility features
AccessibilityUtils.setupKeyboardNavigation();

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Event,
        EventUtils,
        UserManager,
        ValidationUtils,
        createRegistrationTracker
    };
}

// Debug utilities (for development)
const DebugUtils = {
    logEventStats: () => {
        console.table(EventUtils.getEventStats());
    },
    
    logUserStats: () => {
        const stats = Array.from(UserManager.users.values()).map(user => ({
            id: user.id,
            name: user.name,
            registrations: user.registeredEvents.length
        }));
        console.table(stats);
    },
    
    simulateRegistrations: (count = 5) => {
        for (let i = 0; i < count; i++) {
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            if (randomEvent.checkAvailability()) {
                randomEvent.registerUser();
                registrationTracker.addRegistration(randomEvent.category);
            }
        }
        renderEvents();
        console.log(`Simulated ${count} registrations`);
    }
};

// Make debug utilities available in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.DebugUtils = DebugUtils;
    console.log('Debug utilities available via window.DebugUtils');
}

// Service Worker Registration (Progressive Web App features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            // Uncomment when you have a service worker file
            // const registration = await navigator.serviceWorker.register('/sw.js');
            // console.log('ServiceWorker registered: ', registration);
        } catch (error) {
            console.log('ServiceWorker registration failed: ', error);
        }
    });
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for all resources to load
    setTimeout(() => {
        initializePortal();
        
        // Load additional events from API
        if (navigator.onLine) {
            fetchEventsFromAPI();
        }
        
        // Initialize jQuery if available
        initializeJQuery();
        
    }, 100);
});

// Handle online/offline status
window.addEventListener('online', () => {
    showNotification('Connection restored! Loading latest events...', 'success');
    fetchEventsFromAPI();
});

window.addEventListener('offline', () => {
    showNotification('You are currently offline. Some features may be limited.', 'warning');
});

// Auto-save form data as user types
let autoSaveTimeout;
function autoSaveFormData() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        const form = document.getElementById('registrationForm');
        if (form) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Only save if there's actual data
            if (Object.values(data).some(value => value.trim())) {
                sessionStorage.setItem('formAutoSave', JSON.stringify(data));
            }
        }
    }, 1000);
}

// Restore auto-saved form data
function restoreFormData() {
    try {
        const saved = sessionStorage.getItem('formAutoSave');
        if (saved) {
            const data = JSON.parse(saved);
            Object.entries(data).forEach(([key, value]) => {
                const field = document.querySelector(`[name="${key}"]`);
                if (field && value) {
                    field.value = value;
                }
            });
        }
    } catch (error) {
        console.error('Failed to restore form data:', error);
    }
}

// Clear auto-saved data when form is submitted successfully
function clearAutoSavedData() {
    sessionStorage.removeItem('formAutoSave');
}

// Set up auto-save on form fields
document.addEventListener('input', (e) => {
    if (e.target.closest('#registrationForm')) {
        autoSaveFormData();
    }
});

// Initialize form restoration on page load
window.addEventListener('load', () => {
    setTimeout(restoreFormData, 500);
});

console.log('🎉 Community Event Portal JavaScript loaded successfully!');

/* Additional JavaScript for Bootstrap Features */

// Button Group Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // View toggle functionality
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    
    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener('change', function() {
            if (this.checked) {
                document.getElementById('eventsContainer').className = 'row g-4';
                renderEvents();
            }
        });
        
        listViewBtn.addEventListener('change', function() {
            if (this.checked) {
                document.getElementById('eventsContainer').className = 'row g-2';
                renderEventsListView();
            }
        });
    }
    
    // Filter toggle functionality
    const freeEventsOnly = document.getElementById('freeEventsOnly');
    const upcomingOnly = document.getElementById('upcomingOnly');
    
    if (freeEventsOnly) {
        freeEventsOnly.addEventListener('change', function() {
            if (this.checked) {
                filteredEvents = events.filter(event => event.price === 0);
                renderEvents();
            } else {
                filteredEvents = [...events];
                renderEvents();
            }
        });
    }
});

// List View Renderer
function renderEventsListView() {
    const container = document.getElementById('eventsContainer');
    if (!container) return;

    container.innerHTML = '';

    filteredEvents.forEach((event, index) => {
        const eventRow = document.createElement('div');
        eventRow.className = 'col-12 mb-3';
        
        eventRow.innerHTML = `
            <div class="card h-100">
                <div class="row g-0">
                    <div class="col-md-3">
                        <img src="${event.image}" class="img-fluid rounded-start h-100" alt="${event.title}" style="object-fit: cover;">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body d-flex flex-column h-100">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <span class="event-badge">${event.category}</span>
                                <span class="badge bg-primary">${event.seats - event.registrations} spots left</span>
                            </div>
                            <h5 class="card-title">${event.title}</h5>
                            <p class="card-text">${event.description}</p>
                            <div class="row mt-auto">
                                <div class="col-md-8">
                                    <small class="text-muted">
                                        <i class="bi bi-calendar me-1"></i>${event.getFormattedDate()} | 
                                        <i class="bi bi-geo-alt me-1"></i>${event.location} | 
                                        <i class="bi bi-currency-dollar me-1"></i>${event.price === 0 ? 'Free' : '$' + event.price}
                                    </small>
                                </div>
                                <div class="col-md-4 text-end">
                                    ${event.checkAvailability() ? 
                                        `<button class="btn btn-primary" onclick="registerForEvent(${event.id})">
                                            Register
                                        </button>` :
                                        `<button class="btn btn-secondary" disabled>
                                            Full
                                        </button>`
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(eventRow);
    });
}

// Sidebar filter functionality
function initializeSidebarFilters() {
    const sidebarFilters = document.querySelectorAll('#events input[type="checkbox"], #events input[type="radio"]');
    
    sidebarFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            applyAdvancedFilters();
        });
    });
}

function applyAdvancedFilters() {
    let filtered = [...events];
    
    // Category filters
    const categoryCheckboxes = document.querySelectorAll('#events input[type="checkbox"]:checked');
    if (categoryCheckboxes.length > 0) {
        const selectedCategories = Array.from(categoryCheckboxes).map(cb => 
            cb.id.replace('sidebar', '').toLowerCase()
        );
        filtered = filtered.filter(event => 
            selectedCategories.includes(event.category)
        );
    }
    
    // Price filters
    const priceFilter = document.querySelector('#events input[name="priceRange"]:checked');
    if (priceFilter) {
        switch(priceFilter.id) {
            case 'priceFree':
                filtered = filtered.filter(event => event.price === 0);
                break;
            case 'pricePaid':
                filtered = filtered.filter(event => event.price > 0);
                break;
            // 'priceAll' shows all events
        }
    }
    
    filteredEvents = filtered;
    renderEvents();
    
    // Update stats
    updateSidebarStats();
}

function updateSidebarStats() {
    const totalEvents = filteredEvents.length;
    const thisWeek = filteredEvents.filter(event => {
        const eventDate = new Date(event.date);
        const now = new Date();
        const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        return eventDate >= now && eventDate <= weekFromNow;
    }).length;
    
    const availableSpots = filteredEvents.reduce((sum, event) => 
        sum + (event.seats - event.registrations), 0
    );
    
    // Update the stats display
    const statsSection = document.querySelector('#events .small.text-muted');
    if (statsSection) {
        statsSection.innerHTML = `
            <div class="d-flex justify-content-between mb-1">
                <span>Total Events:</span>
                <span class="fw-bold">${totalEvents}</span>
            </div>
            <div class="d-flex justify-content-between mb-1">
                <span>This Week:</span>
                <span class="fw-bold">${thisWeek}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Available Spots:</span>
                <span class="fw-bold">${availableSpots}</span>
            </div>
        `;
    }
}

// Initialize all new features
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebarFilters();
    updateSidebarStats();
});

console.log('✨ Enhanced Bootstrap features loaded successfully!');