function refreshDateTime(){
    mytime = setTimeout('displayAPIs()', 1000)
}

async function displayAPIs() {
    var date = new Date()
    var today = new Date().toLocaleDateString("pt-BR")
    var realTime = date.getHours() + " : " + date.getMinutes() + " : " + date.getSeconds();
    document.getElementById('today').innerHTML = "<b>Today:</b> " + today;
    document.getElementById('realTime').innerHTML = "<b>Real Time:</b> " + realTime;
    refreshDateTime();
}

(async function(){

    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
    const money = await res.json();
    document.getElementById("dolar").innerHTML = "<b>USD: R$</b> " + money.USDBRL.high;
    document.getElementById("euro").innerHTML = "<b>EURO: R$</b> " + money.EURBRL.high;
    document.getElementById("bitcoin").innerHTML = "<b>BITCOIN: R$</b> " + money.BTCBRL.bid;
    
    document.getElementById("os").innerHTML = "<b>OS: </b>" + window.navigator.platform;
    
    if(navigator.userAgent.indexOf("Chrome") != -1){
        document.getElementById("browser").innerHTML = '<b>Browser:</b> Google Chrome';
    } else {
        document.getElementById("browser").innerHTML = 'Firefox';
    }

    const response = await fetch('https://api.ipify.org/?format=json');
    const public_ip = await response.json();
    document.getElementById("public_ip").innerHTML = "<b>IP</b>: "+public_ip.ip;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            document.getElementById("latitude").innerHTML = "<b>Latitude: </b>" + position.coords.latitude.toFixed(6);
            document.getElementById("longitude").innerHTML = "<b>Longitude: </b>" + position.coords.longitude.toFixed(6);
        });
    }
}());