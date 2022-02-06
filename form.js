// variables
const formState = {
    name: {valid: false, error: false},
    email: {valid: false, error: false},
    message: {valid: false, error: false}
}
const form = document.querySelector('#contact-form')
const nameInput = document.querySelector('input[name="full-name"]');
const emailInput = document.querySelector('input[name="email-address"]');
const messageInput = document.querySelector('textarea[name="message"]');
const submitInput = document.querySelector('input[type="submit"]');

// validation helper functions
const validateEmail = str => {
    // pattern sourced from https://emailregex.com/
    const re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return re.test(str);
}

const validateLength = str => {
    return (str.length > 0);
}

const validateInput = (key, el, fn, msg) => {
    formState[key].valid = fn(el.value);
    formState[key].error = !formState[key].valid;
    formState[key].valid ? el.classList.remove('invalid-input') && validateAll() : el.classList.add('invalid-input');
    const feedback = el.previousElementSibling.querySelector('.form-feedback');
    feedback.innerText = formState[key].valid ? '' : msg;
}

//listen for change events on each input and validate each time
//if validation fails, apply a class to highlight the field, and display an error below the field saying what is wrong

nameInput.addEventListener('keyup', () => {
    formState.name.error && validateInput('name', nameInput, validateLength, 'name is required');
});

emailInput.addEventListener('keyup', () => {
    formState.email.error && validateInput('email', emailInput, validateEmail, 'please enter a valid email address');
});
    
messageInput.addEventListener('keyup', () => {
    formState.message.error && validateInput('message', messageInput, validateLength, 'please enter a brief message');
});
        
form.addEventListener('submit', evt => {
    evt.preventDefault();
    validateInput('name', nameInput, validateLength, 'name is required');
    validateInput('email', emailInput, validateEmail, 'please enter a valid email address');
    validateInput('message', messageInput, validateLength, 'please enter a brief message');
    Object.keys(formState).every(k => formState[k].valid) && form.submit()
})
