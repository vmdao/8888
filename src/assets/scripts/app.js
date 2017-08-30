$(document).ready(function () {
    getLocation();
    $('.ui.dropdown').dropdown('hide');
    skycons('partly-cloudy-night');
})

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
        try {
            var location = getCleanLocationName(forecast.timezone);
            console.log(location)
            callback(forecast.currently.temperature, forecast.currently.icon, location);
        } catch (err) {
            console.log(err)
        }

    });
};

function getCleanLocationName(location) {
    return location.split('/')[1].replace(/_/gi, ' ');
}

function callbackSetInfoWeather(temperature, iconName, location) {
    var degrees = fToC(temperature);
    $('.weather-location').html(location);
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
    if (typeof Skycons === 'undefined') return;
    var icon = new Skycons({ color: '#ffffff' }),
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

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            return weatherReport(callbackSetInfoWeather, position.coords.latitude, position.coords.longitude);
        }, function (ee) {
            return weatherReport(callbackSetInfoWeather);
        });
    } else {
        return weatherReport(callbackSetInfoWeather);
    }
}

// function initMap() {
//     var gbLocation = { lat: 1.3030487, lng: 103.8507321 };
//     var map = new google.maps.Map(document.getElementById('8gb-map'), {
//         zoom: 15,
//         center: gbLocation,
//         styles: [
//             {
//                 "featureType": "all",
//                 "elementType": "geometry",
//                 "stylers": [
//                     {
//                         "color": "#63b5e5"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "all",
//                 "elementType": "labels.text.fill",
//                 "stylers": [
//                     {
//                         "gamma": 0.01
//                     },
//                     {
//                         "lightness": 20
//                     }
//                 ]
//             },
//             {
//                 "featureType": "all",
//                 "elementType": "labels.text.stroke",
//                 "stylers": [
//                     {
//                         "saturation": -31
//                     },
//                     {
//                         "lightness": -33
//                     },
//                     {
//                         "weight": 2
//                     },
//                     {
//                         "gamma": 0.8
//                     }
//                 ]
//             },
//             {
//                 "featureType": "all",
//                 "elementType": "labels.icon",
//                 "stylers": [
//                     {
//                         "visibility": "off"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "administrative",
//                 "elementType": "all",
//                 "stylers": [
//                     {
//                         "visibility": "off"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "administrative",
//                 "elementType": "labels",
//                 "stylers": [
//                     {
//                         "visibility": "off"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "administrative.country",
//                 "elementType": "geometry.stroke",
//                 "stylers": [
//                     {
//                         "color": "#12008d"
//                     },
//                     {
//                         "visibility": "simplified"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "administrative.province",
//                 "elementType": "geometry.stroke",
//                 "stylers": [
//                     {
//                         "visibility": "off"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "administrative.province",
//                 "elementType": "labels",
//                 "stylers": [
//                     {
//                         "visibility": "off"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "landscape",
//                 "elementType": "geometry",
//                 "stylers": [
//                     {
//                         "lightness": "0"
//                     },
//                     {
//                         "saturation": "0"
//                     },
//                     {
//                         "color": "#ff0000"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "landscape",
//                 "elementType": "geometry.fill",
//                 "stylers": [
//                     {
//                         "color": "#00395c"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "landscape",
//                 "elementType": "labels",
//                 "stylers": [
//                     {
//                         "visibility": "off"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "landscape",
//                 "elementType": "labels.text",
//                 "stylers": [
//                     {
//                         "visibility": "off"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "poi",
//                 "elementType": "geometry",
//                 "stylers": [
//                     {
//                         "saturation": 20
//                     },
//                     {
//                         "visibility": "off"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "poi",
//                 "elementType": "geometry.fill",
//                 "stylers": [
//                     {
//                         "visibility": "off"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "poi",
//                 "elementType": "geometry.stroke",
//                 "stylers": [
//                     {
//                         "visibility": "off"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "poi.park",
//                 "elementType": "geometry",
//                 "stylers": [
//                     {
//                         "visibility": "off"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "poi.park",
//                 "elementType": "geometry.fill",
//                 "stylers": [
//                     {
//                         "visibility": "on"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "poi.park",
//                 "elementType": "labels",
//                 "stylers": [
//                     {
//                         "visibility": "off"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "road",
//                 "elementType": "geometry",
//                 "stylers": [
//                     {
//                         "lightness": 10
//                     },
//                     {
//                         "saturation": -30
//                     }
//                 ]
//             },
//             {
//                 "featureType": "road",
//                 "elementType": "geometry.stroke",
//                 "stylers": [
//                     {
//                         "saturation": 25
//                     },
//                     {
//                         "lightness": 25
//                     }
//                 ]
//             },
//             {
//                 "featureType": "water",
//                 "elementType": "all",
//                 "stylers": [
//                     {
//                         "lightness": "0"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "water",
//                 "elementType": "geometry.fill",
//                 "stylers": [
//                     {
//                         "color": "#00668d"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "water",
//                 "elementType": "labels",
//                 "stylers": [
//                     {
//                         "visibility": "off"
//                     }
//                 ]
//             }
//         ]
//     });
//     var goldStar = {
//         path: 'M11 2c-3.9 0-7 3.1-7 7 0 5.3 7 13 7 13 0 0 7-7.7 7-13 0-3.9-3.1-7-7-7Zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5 0-1.4 1.1-2.5 2.5-2.5 1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5Z',
//         fillColor: '#ffffff',
//         fillOpacity: 1,
//         scale: 0.5,
//         strokeColor: '#ffffff',
//         strokeWeight: 0
//     };
//     var marker = new google.maps.Marker({
//         position: gbLocation,
//         map: map,
//         icon: goldStar,
//     });
// }

// /**/ typeof jQuery32103370663665927458_1504084275962 === 'function' && jQuery32103370663665927458_1504084275962({"latitude":1.29027,"longitude":103.851959,"timezone":"Asia/Singapore","currently":{"time":1504084276,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":86.15,"apparentTemperature":94.43,"dewPoint":74.18,"humidity":0.68,"pressure":1008.77,"windSpeed":10.31,"windGust":11.11,"windBearing":138,"cloudCover":0.37,"uvIndex":1,"ozone":256.85},"offset":8});