document.querySelector('#form_search_city').addEventListener('submit', async (event) => {
    event.preventDefault();

    let city_name = document.querySelector("#search_city").value;

    // console.log(input);
    if(city_name){
        clearInfo();

        showWarning('Searching city...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city_name)}&appid=07d26e75cc330034880a0277f29f000d&units=metric&lang=pt_br`;
        let results = await fetch(url);
        let response = await results.json();

        if(response.cod === 200){
            showInfo({
                name: response.name,
                country: response.sys.country,
                temp: response.main.temp,
                tempIcon: response.weather[0].icon,
                windSpeed: response.wind.speed,
                windAngle: response.wind.deg
            });
        } else {
            clearInfo();
            showWarning('City not found')
        }
    } else {
        clearInfo();
    }
});

function showInfo(response){
    showWarning('');
    document.querySelector('.titulo').innerHTML = `${response.name}, ${response.country}`;
    document.querySelector('.tempInfo').innerHTML = `${response.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${response.windSpeed} <span>km</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${response.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${response.windAngle-90}deg)`;
    document.querySelector('#city_name_weather').style.display = 'block';
}

function clearInfo(){
    showWarning('');
    document.querySelector('#city_name_weather').style.display = 'none';
}

function showWarning(msg){
    document.querySelector("#alert_city_name").innerHTML = msg;
}
