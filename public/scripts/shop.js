const priceOranges = 0.49;
const priceGrapes = 0.99;
const priceApples = 1.99;
const priceStrawberries = 2.99;
let totalCart = 0;

document.querySelector('#quantityOranges').addEventListener('change', function() {
    document.querySelector("#priceOranges").innerHTML = (this.value * priceOranges).toFixed(2);
    getTotal()
});

document.querySelector('#quantityGrapes').addEventListener('change', function() {
    document.querySelector("#priceGrapes").innerHTML = (this.value * priceGrapes).toFixed(2);
    getTotal()
});

document.querySelector('#quantityApples').addEventListener('change', function() {
    document.querySelector("#priceApples").innerHTML = (this.value * priceApples).toFixed(2);
    getTotal()
});

document.querySelector('#quantityStrawberries').addEventListener('change', function() {
    document.querySelector("#priceStrawberries").innerHTML = (this.value * priceStrawberries).toFixed(2);
    getTotal()
});

function getTotal(){
    document.querySelector("#totalCartShop").innerHTML = 
        (
            parseFloat(document.querySelector("#priceOranges").innerHTML) + 
            parseFloat(document.querySelector("#priceGrapes").innerHTML) + 
            parseFloat(document.querySelector("#priceApples").innerHTML) + 
            parseFloat(document.querySelector("#priceStrawberries").innerHTML))
        .toFixed(2)

    document.querySelector("#value_totalShopCart").value = document.querySelector("#totalCartShop").innerHTML

    console.log(document.querySelector("#totalCartShop").innerHTML)
    console.log(document.querySelector("#value_totalShopCart").value)
}
        

$("#zipcode").change(function() {
    var zipcode = $("#zipcode").val();

    axios.get("https://galhardo-correios.herokuapp.com/cep/" + zipcode)
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

    axios.get("https://galhardo-correios.herokuapp.com/correios/" + zipcode )
    .then(function(response) {
        console.log(response);
        var shipping_fee = response.data[0].Valor;
        var shipping_deadline = response.data[0].PrazoEntrega;
        $('#shipping_fee').val(shipping_fee);
        $('#shipping_deadline').val(shipping_deadline);
    });
});