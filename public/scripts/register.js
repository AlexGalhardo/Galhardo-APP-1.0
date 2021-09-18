const checkbox = document.querySelector('#checkbox_policy');
const btn = document.querySelector('#button_register');
const password = document.querySelector("#password")
const confirm_password = document.querySelector("#confirm_password")
const name = document.querySelector('#username').value
const emailValue = document.querySelector("#email").value
const form = document.querySelector("#form_register")
const app_url = document.querySelector("#app_url").value


let validPassword = false
let validEmail = false
let validName = true


btn.addEventListener('click', async (e) => {
    e.preventDefault()

    if(name.length < 4){
        document.querySelector("#alert_name").innerHTML = "Invalid name!"
        validName = false
    } else {
        document.querySelector("#alert_name").innerHTML = ""
        validName = true
    }

    // verify email
    if(emailValue){
        const response = await fetch(`${app_url}/api/public/email/${emailValue}`)
        const json = await response.json()

        const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(emailValue.match(validEmailRegex) && !json.emailRegistred){
            document.querySelector("#alert_email").innerHTML = ""
            validEmail = true
        } else {
            document.querySelector("#alert_email").innerHTML = "Invalid email!"
            validEmail = false
        }
    } else {
        document.querySelector("#alert_email").innerHTML = "Invalid email!"
        validEmail = false
    }

    if(password.value.length >= 6 && password.value === confirm_password.value) {
        document.querySelector("#alert_password").innerHTML = ""
        validPassword = true
    } else if(password.value.length < 6) {
        document.querySelector("#alert_password").innerHTML = "Password must have at least 6 characters!"
        validPassword = false
    } else {
        document.querySelector("#alert_password").innerHTML = "Password and Confirm Password not equal!"
        validPassword = false
    }

    // verify checkbox policy
    if(!checkbox.checked){
        document.querySelector("#alert_checkbox").innerHTML = "You need to agree with our Policy!"
    } else {
        document.querySelector("#alert_checkbox").innerHTML = ""
    }

    if(validName && validEmail && validPassword && checkbox.checked){
        form.submit()
    }
});

// verify google recaptcha
function cb(token){
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'g-recaptcha-response');
    input.setAttribute('value', token);
    input.setAttribute('type', 'hidden');
    document.getElementsByTagName('form')[0].appendChild(input);
}
