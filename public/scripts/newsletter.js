document.querySelector("#button_subscribe_newsletter").addEventListener('click', function(e){
    e.preventDefault()

    const alertCheckboxEl = document.querySelector("#alert_checkbox_newsletter")
    const alertNameEl = document.querySelector("#alert_name_newsletter")
    const alertEmailEl = document.querySelector("#alert_email_newsletter")

    const formNewsletterEl = document.querySelector("#form_newsletter")

    let validName = false
    let validEmail = false
    let validCheckboxPolicy = false

    if(!document.querySelector("#name_newsletter").value){
        alertNameEl.innerHTML = "Enter your first name!"
    } else {
        alertNameEl.innerHTML = ""
        validName = true
    }

    if(!document.querySelector("#email_newsletter").value || document.querySelector("#email_newsletter").value.length < 8){
        alertEmailEl.innerHTML = "Enter your email!"
    } else {
        alertEmailEl.innerHTML = ""
        validEmail = true
    }

    if(!document.querySelector("#checkbox_newsletter").checked){
        alertCheckboxEl.innerHTML = "You need to agree with our policy!"
    } else {
        alertCheckboxEl.innerHTML = ""
        validCheckboxPolicy = true
    }

    if(validName && validEmail && validCheckboxPolicy){
        formNewsletterEl.submit()
    }
})
