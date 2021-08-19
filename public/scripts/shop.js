const priceOranges = 0.49;
const priceGrapes = 0.99;
const priceApples = 1.99;
const priceStrawberries = 2.99;

const priceOrangesEl = document.querySelector("#priceOranges")
const priceGrapesEl = document.querySelector("#priceGrapes")
const priceApplesEl = document.querySelector("#priceApples")
const priceStrawberriesEl = document.querySelector("#priceStrawberries")

const totalShopCartEl = document.querySelector("#total_shop_cart")
const buttonPayEl = document.querySelector("#button_pay_with_credit_card")
const totalAmount = document.querySelector("#total_shop_cart_amount")

let pricePayButton = parseFloat(buttonPayEl.innerHTML)


document.querySelector('#quantityOranges').addEventListener('change', function(e) {
    priceOrangesEl.innerHTML = (e.target.value * priceOranges).toFixed(2);
    updatePricePayButton()
});

document.querySelector('#quantityGrapes').addEventListener('change', function(e) {
    priceGrapesEl.innerHTML = (e.target.value * priceGrapes).toFixed(2);
    updatePricePayButton()
});

document.querySelector('#quantityApples').addEventListener('change', function(e) {
    priceApplesEl.innerHTML = (e.target.value * priceApples).toFixed(2);
    updatePricePayButton()
});

document.querySelector('#quantityStrawberries').addEventListener('change', function(e) {
    priceStrawberriesEl.innerHTML = (e.target.value * priceStrawberries).toFixed(2);
    updatePricePayButton()
});

function updatePricePayButton() {
    buttonPayEl.innerHTML = (
        parseFloat(document.querySelector('#shipping_fee').value) + 
        parseFloat(priceOrangesEl.innerHTML) + 
        parseFloat(priceGrapesEl.innerHTML) + 
        parseFloat(priceApplesEl.innerHTML) + 
        parseFloat(priceStrawberriesEl.innerHTML)
    ).toFixed(2)

    totalShopCartEl.innerHTML = (parseFloat(buttonPayEl.innerHTML) - parseFloat(document.querySelector('#shipping_fee').value)).toFixed(2)
    
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

    // SHIPPING DATA
    const responseShipping = await fetch(`https://correios.galhardoapp.com/shipping/${zipcode}`)
    const shippingJson = await responseShipping.json()
    
    const shipping_fee = parseFloat(shippingJson[0].Valor);
    const shipping_deadline = shippingJson[0].PrazoEntrega;

    document.querySelector('#shipping_fee').value = shipping_fee
    document.querySelector('#shipping_deadline').value = shipping_deadline

    // UPDATE PAY BUTTON PRICE
    buttonPayEl.innerHTML = (parseFloat(totalShopCartEl.innerHTML) + parseFloat(shipping_fee)).toFixed(2)
});


