const form = document.getElementById('registration-form');
const username = document.getElementById('Username');
const email = document.getElementById('Email');
const password = document.getElementById('Password');
const confirmPassword = document.getElementById('Confirm Password');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isRequiredValid = checkRequired([
        username,
        email,
        password,
        confirmPassword
    ]);

    let isFormValid = isRequiredValid;

    if (isRequiredValid) {
        const isUsernameValid = checkLength(username, 3, 15);
        const isEmailValid = checkEmail(email);
        const isPasswordValid = checkLength(password, 6, 25);
        const isConfirmPasswordValid =
            checkPasswordsMatch(password, confirmPassword);

        isFormValid =
            isUsernameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid;
    }

    if (isFormValid) {
        alert('Registration successful');
        form.reset();

        document.querySelectorAll('.form-item').forEach((group) => {
            group.className = 'form-item';
        });
    }
});

function checkRequired(inputArray) {
    let isValid = true;

    inputArray.forEach((input) => {
        if (input.value.trim() === '') {
            showError(
                input,
                `${formatFieldName(input)} is required`
            );
            isValid = false;
        } else {
            showSuccess(input);
        }
    });

    return isValid;
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${formatFieldName(input)} must be at least ${min} characters`
        );
        return false;
    } else if (input.value.length > max) {
        showError(
            input,
            `${formatFieldName(input)} must be less than ${max} characters`
        );
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkEmail(input) {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(input.value.trim())) {
        showSuccess(input);
        return true;
    } else {
        showError(input, 'Email is not valid');
        return false;
    }
}

function checkPasswordsMatch(password, confirmPassword) {
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        return false;
    } else {
        showSuccess(confirmPassword);
        return true;
    }
}

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-item error';

    const small = formGroup.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-item success';
}

function formatFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
