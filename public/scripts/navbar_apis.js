function refreshDateTime(){
    mytime = setTimeout('displayCurrentlyDateTime()', 1000)
}

async function displayCurrentlyDateTime() {
    var date = new Date()
    var todayDate = new Date().toLocaleDateString("pt-BR")
    var realTime = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`
    document.getElementById('today').innerHTML = `<b>Today:</b> ${todayDate}`;
    document.getElementById('realTime').innerHTML = `<b>Real Time:</b> ${realTime}`
    refreshDateTime();
}

(async function(){
    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL');
    const money = await res.json();
    document.getElementById("dolar").innerHTML = `<b>USD: R$</b> ${money.USDBRL.high}`
    document.getElementById("euro").innerHTML = `<b>EURO: R$</b> ${money.EURBRL.high}`
    const response = await fetch('https://www.mercadobitcoin.net/api/BTC/ticker/');
    const resJson = await response.json()
    document.getElementById("bitcoin").innerHTML = `<b>BITCOIN: R$</b> ${parseFloat(resJson.ticker.buy).toFixed(4)}`
}());