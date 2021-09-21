const totalShopCartEl = document.querySelector("#total_shop_cart")
const buttonPayEl = document.querySelector("#button_pay")
const totalAmount = document.querySelector("#total_shop_amount")

let pricePayButton = parseFloat(buttonPayEl.innerHTML)

function updateTotalAmount(){
    buttonPayEl.innerHTML = (parseFloat(totalShopCartEl.innerHTML) + parseFloat(document.querySelector('#shipping_fee').value)).toFixed(2)
    totalAmount.value = parseFloat(buttonPayEl.innerHTML).toFixed(2)
}

document.querySelector('#zipcode').addEventListener('change', async function(e) {

    const zipcode = e.target.value
    
    // CEP DATA
    const responseCEP = await fetch(`https://correios.galhardoapp.com/cep/${zipcode}`)
    const cepJson = await responseCEP.json()

    const { logradouro, bairro, localidade, uf } = cepJson

    document.querySelector('#customer_street').value = logradouro
    document.querySelector('#customer_neighborhood').value = bairro
    document.querySelector('#customer_city').value = localidade
    document.querySelector('#customer_state').value = uf
    document.querySelector('#customer_country').value = 'Brazil'

    // SHIPPING DATA
    const responseShipping = await fetch(`https://correios.galhardoapp.com/shipping/${zipcode}`)
    const shippingJson = await responseShipping.json()
    
    const shipping_fee = parseFloat(shippingJson[0].Valor);
    const shipping_deadline = shippingJson[0].PrazoEntrega;

    document.querySelector('#shipping_carrier').value = "Correios"
    document.querySelector('#shipping_fee').value = shipping_fee
    document.querySelector('#shipping_deadline').value = shipping_deadline

    updateTotalAmount()
});


