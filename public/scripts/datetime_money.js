function refreshDateTime(){
    mytime = setTimeout('displayCurrentlyDateTime()', 1000)
}

function fixZero(time){
    return time < 10 ? `0${time}` : time;
}

async function displayCurrentlyDateTime() {
    var date = new Date()
    var todayDate = new Date().toLocaleDateString("pt-BR")
    var realTime = `${fixZero(date.getHours())} : ${fixZero(date.getMinutes())} : ${fixZero(date.getSeconds())}`
    document.getElementById('today').innerHTML = `<b>Today:</b> ${todayDate}`;
    document.getElementById('realTime').innerHTML = `<b>Real Time:</b> ${realTime}`
    refreshDateTime();
}

(async function(){

    displayCurrentlyDateTime()

    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL');
    const money = await res.json();
    document.getElementById("dolar").innerHTML = `<b>USD: R$</b> ${parseFloat(money.USDBRL.high).toFixed(2)}`
    document.getElementById("euro").innerHTML = `<b>EURO: R$</b> ${parseFloat(money.EURBRL.high).toFixed(2)}`


    const response = await fetch('https://www.mercadobitcoin.net/api/BTC/ticker/');
    const resJson = await response.json()
    document.getElementById("bitcoin").innerHTML = `<b>BITCOIN: R$</b> ${parseFloat(resJson.ticker.buy).toFixed(2)}`
}());
