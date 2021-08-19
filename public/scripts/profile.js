$("#zipcode").change(function() {
    var zipcode = $("#zipcode").val();

    axios.get("https://correios.galhardoapp.com/cep/" + zipcode)
    .then(function(response) {
        var street = response.data.logradouro;
        var neighborhood = response.data.bairro;
        var city = response.data.localidade;
        var state = response.data.uf;
        $('#street').val(street);
        $('#neighborhood').val(neighborhood);
        $('#city').val(city);
        $('#state').val(state);
    });
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
        