const newPassword = document.querySelector("#new_password")
const confirmNewPassword = document.querySelector("#confirm_new_password")
const btn = document.querySelector('#button_reset_password');
const form = document.querySelector("#form_reset_password")

let validPassword = false

btn.addEventListener('click', async (e) => {
    e.preventDefault()

    if(newPassword.value.length >= 6 && newPassword.value === confirmNewPassword.value) {
        document.querySelector("#alert_password").innerHTML = ""
        validPassword = true
    } else if(newPassword.value.length < 6) {
        document.querySelector("#alert_password").innerHTML = "Password must have at least 6 characters!"
        validPassword = false
    } else {
        document.querySelector("#alert_password").innerHTML = "Password and Confirm Password not equal!"
        validPassword = false
    }

    if(validPassword){
        form.submit()
    }
});
