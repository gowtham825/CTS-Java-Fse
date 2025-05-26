// Exercise 11: Working with Forms
// Requirements:

// Capture name, email, and selected event using form.elements
// Prevent default form behavior using event.preventDefault()
// Validate inputs and show errors inline

/* Form Elements Access - Exercise 11 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Using form.elements
    const userName = form.elements['userName'].value;
    const userEmail = form.elements['userEmail'].value;
    const eventType = form.elements['eventType'].value;
}


/* Prevent Default Behavior - Exercise 11 */
function handleFormSubmit(event) {
    event.preventDefault();  // Prevent default form submission
    
    const form = event.target;
    const formData = new FormData(form);
    
    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
    }
    
    submitRegistration(userData);
}

/* Form Validation - Exercise 11 */
function validateFormField(event) {
    const field = event.target;
    const value = field.value.trim();
    
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