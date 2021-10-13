window.onload = function(){
    let subscribedNewsletter = localStorage.getItem('subscribed_newsletter');

    // show newsletter card
    if(subscribedNewsletter){
        document.querySelector("#newsletter_card").innerHTML = `
                        <div class="card mt-3">
                            <div class="card-body">
                                <form id="form_newsletter" method="POST" action="https://app.convertkit.com/forms/2606331/subscriptions">
                                    <h5 class="card-title fw-bold text-center">Newsletter</h5>
                                    <small class="text-center">Get the best news about games and books once a week!</small>

                                    <br>

                                    <small class="fw-bold text-danger" id="alert_name_newsletter"></small>
                                    <input name="fields[first_name]" class="form-control form-control-sm mt-2" type="text" placeholder="Enter your name" required id="name_newsletter">

                                    <small class="fw-bold text-danger" id="alert_email_newsletter"></small>
                                    <input name="email_address" class="form-control form-control-sm mt-2" type="email" placeholder="Enter your email" required id="email_newsletter">

                                    <div class="form-check mt-2 text-start">

                                        <small class="fw-bold text-danger" id="alert_checkbox_newsletter"></small>
                                        <input type="checkbox" class="form-check-input" id="checkbox_newsletter">

                                        <label class="form-check-label" for="checkbox_policy">
                                            <small>
                                                You agree with our
                                                <a target="_blank" href="/privacy">Privacy and Terms of Use Policy</a> and accept to receive offers and advertisements.
                                            </small>
                                        </label>

                                    </div>

                                    <button id="button_subscribe_newsletter" type="submit" class="mt-3 w-100 btn btn-sm btn-outline-dark">Subscribe to newsletter</button>

                                </form>

                            </div>
                        </div>`


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

            let emailValue = document.querySelector("#email_newsletter").value
            const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if(!emailValue || !emailValue.match(validEmailRegex)){
                alertEmailEl.innerHTML = "Invalid Email!"
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
                localStorage.setItem('subscribed_newsletter', true);
                formNewsletterEl.submit()
            }
        })
    }
}



