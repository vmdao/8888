$('.ui.dropdown').dropdown('hide');
weatherReport(callbackSetInfoWeather);

function weatherReport(callback, latitude, longitude, timezone, lang) {
    // variables config for coordinates, url and api key
    // latitude and longitude are accepted arguments and passed
    var API_URL = 'https://api.darksky.net/forecast/',
        API_KEY = 'aff3b5b1e1927036d1958318ddf0505f',
        _options = {
            latitude: 1.290270,
            longitude: 103.851959,
            timezone: 'America/Los_Angeles',
            lang: 'en',
            exclude: 'flags,alerts,daily,minutely,hourly',
            extend: ''
        };

    var lati = latitude || _options.latitude,
        longi = longitude || _options.longitude,
        lang = lang || _options.lang,
        exclude = _options.exclude,
        API_CALL = API_URL + API_KEY + "/" + lati + "," + longi + "?exclude=" + exclude + "&callback=?";

    // Call to the DarkSky API to retrieve JSON
    $.getJSON(API_CALL, function (forecast) {
        callback(forecast.currently.temperature, forecast.currently.icon);
    });
};

function callbackSetInfoWeather(temperature, iconName) {
    console.log('forecast', temperature, iconName)
    var degrees = fToC(temperature);
    $('.weather-temp strong').html(degrees);
    $('.weather-icon').replaceWith('<canvas class="weather-icon ' + iconName + '"></canvas>');
    skycons(iconName);
}

function fToC(fahrenheit) {
    var fTemp = fahrenheit,
        fToCel = (fTemp - 32) * 5 / 9;
    return fToCel.toFixed(1);
}

function skycons(iconName) {
    var icon = new Skycons({ "color": "#FFFFFF" }),
        list = [
            "rain",
            "sleet",
            "snow",
            "wind",
            "fog",
            "cloudy",
            "clear-day",
            "clear-night",
            "partly-cloudy-day",
            "partly-cloudy-night",
        ];
    icon.set($('.' + iconName).get(0), iconName)
    icon.play();
}
