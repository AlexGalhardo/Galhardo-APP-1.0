const cb = document.querySelector('#checkbox_policy');
const btn = document.querySelector('#button_register');
const password = document.querySelector("#password")
const confirm_password = document.querySelector("#confirm_password")
const email = document.querySelector("#email")
const form = document.querySelector("#form_register")

let validPassword = false
let validEmail = false

btn.addEventListener('click', async (e) => {
    e.preventDefault()

    // verify email
    const response = await fetch(`http://localhost:3000/api/public/${email.value}`)
    const json = await response.json()

    if(email.value.length >= 8 && !json.emailRegistred){
        document.querySelector("#alert_email").innerHTML = ""
        validEmail = true
    } else {
        document.querySelector("#alert_email").innerHTML = "Email already registred!"
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
    if(!cb.checked){
        alert('You need to agree with our Policy!')
        document.querySelector("#alert_checkbox").innerHTML = "You need to agree with our Policy!"
    } else {
        document.querySelector("#alert_checkbox").innerHTML = ""
    }

    if(validEmail && validPassword && cb.checked){
        form.submit()
    }
});
