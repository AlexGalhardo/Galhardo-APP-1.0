const priceOranges = 0.49;
const priceGrapes = 0.99;
const priceApples = 1.99;
const priceStrawberries = 2.99;
let totalCart = 0;

const priceOrangesEl = document.querySelector("#priceOranges")
const priceGrapesEl = document.querySelector("#priceGrapes")
const priceApplesEl = document.querySelector("#priceApples")
const priceStrawberriesEl = document.querySelector("#priceStrawberries")
const totalShopCartEl = document.querySelector("#button_pay_with_credit_card")

document.querySelector('#quantityOranges').addEventListener('change', function(e) {
    priceOrangesEl.innerHTML = (e.target.value * priceOranges).toFixed(2);
    updateShopCartTotal()
});

document.querySelector('#quantityGrapes').addEventListener('change', function(e) {
    priceGrapesEl.innerHTML = (e.target.value * priceGrapes).toFixed(2);
    updateShopCartTotal()
});

document.querySelector('#quantityApples').addEventListener('change', function(e) {
    priceApplesEl.innerHTML = (e.target.value * priceApples).toFixed(2);
    updateShopCartTotal()
});

document.querySelector('#quantityStrawberries').addEventListener('change', function(e) {
    priceStrawberriesEl.innerHTML = (e.target.value * priceStrawberries).toFixed(2);
    updateShopCartTotal()
});

function updateShopCartTotal(){
    totalShopCartEl.innerHTML = 
        (    parseFloat(priceOrangesEl.innerHTML) + 
            parseFloat(priceGrapesEl.innerHTML) + 
            parseFloat(priceApplesEl.innerHTML) + 
            parseFloat(priceStrawberriesEl.innerHTML)).toFixed(2)

    document.querySelector("#input_hidden_total_shop_cart").value = document.querySelector("#button_pay_with_credit_card").innerHTML
    document.querySelector("#total_shop_cart").innerHTML = document.querySelector("#button_pay_with_credit_card").innerHTML
}
        

$("#zipcode").change(function() {
    var zipcode = $("#zipcode").val();

    axios.get("https://correios.galhardoapp.com/cep/" + zipcode)
    .then(function(response) {
        var street = response.data.logradouro;
        var neighborhood = response.data.bairro;
        var city = response.data.localidade;
        var state = response.data.uf;
        $('#customer_street').val(street);
        $('#customer_neighborhood').val(neighborhood);
        $('#customer_city').val(city);
        $('#customer_state').val(state);
    });

    axios.get("https://correios.galhardoapp.com/shipping/" + zipcode )
    .then(function(response) {
        console.log(response);
        var shipping_fee = response.data[0].Valor;
        var shipping_deadline = response.data[0].PrazoEntrega;
        $('#shipping_fee').val(shipping_fee);
        $('#shipping_deadline').val(shipping_deadline);
    });
});