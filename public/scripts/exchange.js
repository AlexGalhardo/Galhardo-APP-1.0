const currencyOneEl = document.querySelector('[data-js="currency-one"]');
const currencyTwoEl = document.querySelector('[data-js="currency-two"]');
const currenciesEl = document.querySelector('[data-js="currencies-container"]');
const convertedValueEl = document.querySelector('[data-js="converted-value"]')
const valuePrecisionEl = document.querySelector('[data-js="conversion-precision"]')
const timesCurrencyOneEl = document.querySelector('[data-js="currency-one-times"]')

let internalExchangeRate = {}

const getUrl = currency =>  `https://v6.exchangerate-api.com/v6/9338e7d78f448ba7d11f73f6/latest/${currency}`;

const getErrorMessage = errorType => ({
    "unsupported-code": "we don't support the supplied currency code (see supported currencies...).",
    "malformed-request": "when some part of your request doesn't follow the structure shown above.",
    "invalid-key": "when your API key is not valid.",
    "inactive-account": "if your email address wasn't confirmed.",
    "quota-reached": "when your account has reached the the number of requests allowed by your plan."
})[errorType] || 'Não foi possível obter as informações';


const showAlert = err => {
    const div = document.createElement('div');
    const button = document.createElement('button')

    div.textContent = err.message
    div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show')
    div.setAttribute('role', 'alert')
    button.setAttribute('type', 'button')
    button.setAttribute('aria-label', 'Close')
    button.classList.add('btn-close');

    button.addEventListener('click', () => {
        div.remove()
    })

    div.appendChild(button)
    currenciesEl.insertAdjacentElement('afterend', currenciesEl);
}

const fetchExchangeRate = async url => {
    try {
        const response = await fetch(url)

        if(!response.ok){
            throw new Error('Sua conexão falhou!')
        }

        const exchangeRateData = await response.json()

        if(exchangeRateData.result === 'error'){
            throw new Error(getErrorMessage(exchangeRateData['invalid-key']))
        }

        return exchangeRateData
    } catch(err){
        showAlert(err)
    }
}

const showInitialInfo = () => {
    const getOptions = selectedCurrency => Object.keys(internalExchangeRate.conversion_rates)
        .map(currency => `<option ${currency === selectedCurrency ? 'selected' : ''}>${currency}</option>`)
        .join('')

    currencyOneEl.innerHTML = getOptions('USD')
    currencyTwoEl.innerHTML = getOptions('BRL')

    convertedValueEl.textContent = internalExchangeRate.conversion_rates.BRL.toFixed(2);
    valuePrecisionEl.textContent = `1 ${currencyOneEl.value} = ${internalExchangeRate.conversion_rates.BRL} BRL`
}

const init = async () => {
    internalExchangeRate = { ...(await fetchExchangeRate(getUrl('USD'))) }

    if(internalExchangeRate.conversion_rates){
        showInitialInfo()
    }
}

const showUpdatedRates = () => {
    convertedValueEl.textContent = (timesCurrencyOneEl.value * internalExchangeRate.conversion_rates[currencyTwoEl.value]).toFixed(2)

    valuePrecisionEl.textContent = `1 ${currencyOneEl.value} = ${1 * internalExchangeRate.conversion_rates[currencyTwoEl.value]} ${currencyTwoEl.value}`;
}


timesCurrencyOneEl.addEventListener('input', e => {
    convertedValueEl.textContent = (e.target.value * internalExchangeRate.conversion_rates[currencyTwoEl.value]).toFixed(2)
})

currencyTwoEl.addEventListener('input', showUpdatedRates)


currencyOneEl.addEventListener('input', async e => {
    internalExchangeRate = { ...(await fetchExchangeRate(getUrl(e.target.value))) }
    showUpdatedRates()
})

init()
