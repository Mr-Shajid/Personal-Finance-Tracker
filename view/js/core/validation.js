

// 1. Check if a field is not empty
function isNotEmpty(input) {
    var value = input.value.trim(); // Remove spaces from start and end
    if (value === '') {
        showError(input, 'This field is required');
        return false;
    } else {
        hideError(input);
        return true;
    }
}

// 2. Check if a number is positive (greater than 0)
function isPositiveNumber(input) {
    var value = Number(input.value);
    if (isNaN(value) || value <= 0) {
        showError(input, 'Please enter a positive number');
        return false;
    } else {
        hideError(input);
        return true;
    }
}

// 3. Check if email is valid
function isValidEmail(input) {
    var email = input.value.trim();
    if (email.includes('@') && email.includes('.')) {
        hideError(input);
        return true;
    } else {
        showError(input, 'Please enter a valid email');
        return false;
    }
}

// 4. Check if password is long enough
function isValidPassword(input) {
    var password = input.value;
    if (password.length >= 6) {
        hideError(input);
        return true;
    } else {
        showError(input, 'Password must be at least 6 characters');
        return false;
    }
}

// 5. Check if date is selected
function isValidDate(input) {
    if (input.value !== '') {
        hideError(input);
        return true;
    } else {
        showError(input, 'Please select a date');
        return false;
    }
}

// 6. Check if option is selected from dropdown
function isOptionSelected(input) {
    if (input.value !== '' && input.value !== null) {
        hideError(input);
        return true;
    } else {
        showError(input, 'Please select an option');
        return false;
    }
}

// 7. Show error message
function showError(input, message) {
    // Find the error div next to the input
    var errorDiv = input.parentElement.querySelector('.error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
    // Make the input box look red
    input.style.borderColor = 'red';
}

// 8. Hide error message
function hideError(input) {
    // Find the error div next to the input
    var errorDiv = input.parentElement.querySelector('.error');
    if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
    // Make the input box look normal
    input.style.borderColor = '';
}

// 9. Check all fields in a form
function validateForm(formId) {
    var form = document.getElementById(formId);
    var isFormValid = true;
    
    // Get all input fields in the form
    var inputs = form.querySelectorAll('input, select, textarea');
    
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var isValid = true;
        
        // Check different types of inputs
        if (input.type === 'email') {
            isValid = isValidEmail(input);
        } else if (input.type === 'password') {
            isValid = isValidPassword(input);
        } else if (input.type === 'number') {
            isValid = isPositiveNumber(input);
        } else if (input.type === 'date') {
            isValid = isValidDate(input);
        } else if (input.tagName === 'SELECT') {
            isValid = isOptionSelected(input);
        } else if (input.required) {
            isValid = isNotEmpty(input);
        }
        
        if (!isValid) {
            isFormValid = false;
        }
    }
    
    return isFormValid;
}

// 10. Add validation to a form when page loads
function addValidationToForm(formId) {
    var form = document.getElementById(formId);
    
    // Check fields as user types
    var inputs = form.querySelectorAll('input, select, textarea');
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        
        input.addEventListener('blur', function() {
            // Check this field when user clicks away
            validateSingleField(this);
        });
    }
}

// 11. Validate just one field
function validateSingleField(input) {
    if (input.type === 'email') {
        return isValidEmail(input);
    } else if (input.type === 'password') {
        return isValidPassword(input);
    } else if (input.type === 'number') {
        return isPositiveNumber(input);
    } else if (input.type === 'date') {
        return isValidDate(input);
    } else if (input.tagName === 'SELECT') {
        return isOptionSelected(input);
    } else if (input.required) {
        return isNotEmpty(input);
    }
    return true;
}
