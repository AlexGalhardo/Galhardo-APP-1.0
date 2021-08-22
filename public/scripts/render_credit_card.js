$('#form_shop_checkout').card({
    container: '#div_stripe_credit_card',
    formSelectors: {
        numberInput: 'input[name="card_number"]',
        nameInput: 'input[name="holder_name"]',
        expiryInput: 'input[name="card_exp_month"], input[name="card_exp_year"]',
        cvcInput: 'input[name="card_cvc"]'
    }
});