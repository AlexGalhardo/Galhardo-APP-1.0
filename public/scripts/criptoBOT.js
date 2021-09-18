new TradingView.widget({
  "width": 800,
  "height": 500,
  "symbol": "BINANCE:BTCUSDT",
  "interval": "1",
  "timezone": "America/Sao_Paulo",
  "theme": "light",
  "style": "1",
  "locale": "br",
  "toolbar_bg": "#f1f3f6",
  "enable_publishing": false,
  "allow_symbol_change": true,
  "details": true,
  "container_id": "tradingview_f0c02"
});




let connection = new WebSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@ticker');



const config = {
    buy: 0,
    sell: 0,
    side: 'BUY',
    symbol: 'BTCUSDT'
}


document.querySelector("#buy").addEventListener('change', function(e){
    config.buy = parseFloat(e.target.value)
})

document.querySelector("#sell").addEventListener('change', function(e){
    config.sell = parseFloat(e.target.value)
})


const profit = {
    value: 0,
    perc: 0,
    lastBuy: 0
}


const setProfit = {
    value: 0,
    perc: 0,
    lastBuy: 0
}



connection.onmessage = (event) => {

    const trade = JSON.parse(event.data);

    if(event && trade.data){

        if (trade.stream === config.symbol.toLowerCase() + '@ticker') {

            document.querySelector("#ticker_o").innerHTML = parseFloat(trade.data.o).toFixed(2)
            document.querySelector("#ticker_h").innerHTML = parseFloat(trade.data.h).toFixed(2)
            document.querySelector("#ticker_l").innerHTML = parseFloat(trade.data.l).toFixed(2)
            document.querySelector("#ticker_c").innerHTML = parseFloat(trade.data.c).toFixed(2)
            document.querySelector("#ticker_P").innerHTML = parseFloat(trade.data.P).toFixed(2)

            processData(trade.data);
        }


    }
}

connection.onerror = (event) => {
    alert(event)
}



function processData(ticker) {

    const lastPrice = parseFloat(ticker.c).toFixed(2);

    if (config.side === 'BUY' && config.buy > 0 && lastPrice <= config.buy) {

        console.log('BUY ' + lastPrice);

        buyNow();

        config.side = 'SELL';

        setProfit.value = profit.value
        setProfit.perc = profit.perc
        setProfit.lastBuy = lastPrice

        document.querySelector("#profit_value").value = parseFloat(profit.value).toFixed(2)
        document.querySelector("#profit_percentage").value = parseFloat(profit.perc).toFixed(2)

    }
    else if (config.side === 'SELL' && config.sell > profit.lastBuy && lastPrice >= config.sell) {

        console.log('SELL ' + lastPrice);

        sellNow();

        config.side = 'BUY';

        const lastProfit = lastPrice - profit.lastBuy;

        setProfit.value = profit.value + lastProfit
        setProfit.perc = profit.perc + (lastPrice * 100 / profit.lastBuy - 100)
        setProfit.lastBuy =  0

        document.querySelector("#profit_value").value = parseFloat(profit.value).toFixed(2)
        document.querySelector("#profit_percentage").value = parseFloat(profit.perc).toFixed(2)
    }
  }



function buyNow(){
    fetch('http://localhost:3000/criptoBOT/BUY/' + config.symbol + '/0.01', {
        method: 'POST'
    })
        .then(result => result.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
}



function sellNow(){
    fetch('http://localhost:3000/criptoBOT/SELL/' + config.symbol + '/0.01', {
        method: 'POST'
    })
        .then(result => result.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
}
