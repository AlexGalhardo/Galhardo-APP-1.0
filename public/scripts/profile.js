const buttonUpdateProfile = document.querySelector("#button_update_profile")
const formUpdateProfile = document.querySelector("#form_update_profile")

const name = document.querySelector('#name');
const email = document.querySelector("#email");
const newPassword = document.querySelector("#new_password")

let validName = true
let validEmail = true
let validPassword = true


buttonUpdateProfile.addEventListener('click', async (e) => {

    e.preventDefault()

    if(name.value.length < 4){
        document.querySelector("#alert_name").innerHTML = "Invalid name"
        validName = false
    } else {
        document.querySelector("#alert_name").innerHTML = ""
        validName = true
    }

    // verify email
    const response = await fetch(`https://galhardoapp.com/api/public/email/${email.value}`)
    const json = await response.json()

    if(email.value.length >= 8 && !json.emailRegistred || email.value === "admin@gmail.com"){
        document.querySelector("#alert_email").innerHTML = ""
        validEmail = true
    } else {
        document.querySelector("#alert_email").innerHTML = "Invalid email!"
        validEmail = false
    }

    // verify password
    if(newPassword.value && newPassword.value.length < 6){
        document.querySelector("#alert_password").innerHTML = "Password must have at least 6 characters!"
        validPassword = false
    } else {
        document.querySelector("#alert_password").innerHTML = ""
        validPassword = true
    }

    if(validName && validEmail && validPassword){
        formUpdateProfile.submit()
    }
})


document.querySelector('#zipcode').addEventListener('change', async function(e) {

    const zipcode = e.target.value

    // CEP DATA
    const responseCEP = await fetch(`https://correios.galhardoapp.com/cep/${zipcode}`)
    const cepJson = await responseCEP.json()

    const { logradouro, bairro, localidade, uf } = cepJson

    document.querySelector('#street').value = logradouro
    document.querySelector('#neighborhood').value = bairro
    document.querySelector('#city').value = localidade
    document.querySelector('#state').value = uf
});


(async function(){
    document.getElementById("operation_system").value = window.navigator.platform;

    if(navigator.userAgent.indexOf("Chrome") != -1){
        document.getElementById("browser").value = 'Google Chrome';
    } else {
        document.getElementById("browser").value = 'Firefox';
    }

    const response = await fetch('https://api.ipify.org/?format=json');
    const public_ip = await response.json();
    document.getElementById("public_ip").value = public_ip.ip;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            document.getElementById("latitude").value = position.coords.latitude.toFixed(6);
            document.getElementById("longitude").value = position.coords.longitude.toFixed(6);
        });
    }
}());
        
