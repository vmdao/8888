'use strict';

(function ($) {
    'use strict';
    // start

    $(document).ready(function () {
        // start menu dropdown
        $('.ui.dropdown').dropdown('hide');

        // start page index.html
        $('.pin-weather').length > 0 ? (skycons('partly-cloudy-night'), getLocation()) : '';

        // start page about-us.html
        $('.box-service-showoff').length > 0 ? setAnimationText() : '';
    });

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
                console.log(location);
                callback(forecast.currently.temperature, forecast.currently.icon, location);
            } catch (err) {
                console.log(err);
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
            list = ["rain", "sleet", "snow", "wind", "fog", "cloudy", "clear-day", "clear-night", "partly-cloudy-day", "partly-cloudy-night"];
        icon.set($('.' + iconName).get(0), iconName);
        icon.play();
    }

    function getLocation() {
        // get permision check location chrome
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                return weatherReport(callbackSetInfoWeather, position.coords.latitude, position.coords.longitude);
            }, function (error) {
                console.log('User no give allow get location', error);
                // default fallback location Singapore
                return weatherReport(callbackSetInfoWeather);
            });
        } else {
            console.log('Location not support this browser');

            // default fallback location Singapore
            return weatherReport(callbackSetInfoWeather);
        }
    }

    function setAnimationText() {

        var storeStringAnimation = [{
            contentHTML: "8 GB TECHNOLOGIES",
            selector: "#company-name",
            className: "",
            time: 35
        }, {
            contentHTML: "Founded in 2014",
            selector: "#resume-created",
            className: "sign",
            time: 35
        }, {
            contentHTML: "With a Aim to provide the best IT Solutions for businesses.",
            selector: "#resume-job01",
            className: "sign",
            time: 35
        }, {
            contentHTML: "We’re a team of IT Specialists, specialise in...",
            selector: "#resume-job02",
            className: "sign",
            time: 35
        }, {
            contentHTML: "Digital Marketing",
            selector: "#digitalMakerting",
            className: "",
            time: 35,
            isIcon: true
        }, {
            contentHTML: "SEO : ON & OFF Pages Optimization | Link Building | Leads Generation",
            selector: "#digitalMakerting-seo",
            className: "sign",
            time: 35
        }, {
            contentHTML: "SEM : Competitor Analysis | Keywords Optimization | Campaign Managment",
            selector: "#digitalMakerting-sem",
            className: "sign",
            time: 35
        }, {
            contentHTML: "SMM : Social Media Outreach | Content Generation | Social Media Growth",
            selector: "#digitalMakerting-smm",
            className: "sign",
            time: 35
        }, {
            contentHTML: "Web Design and Development",
            selector: "#webDevelopment",
            className: "",
            time: 35,
            isIcon: true
        }, {
            contentHTML: "Creative And Responsive Design",
            selector: "#webDevelopment-create",
            className: "sign",
            time: 35
        }, {
            contentHTML: "Integrate with User-Friendly Content Management System",
            selector: "#webDevelopment-integrate",
            className: "sign",
            time: 35
        }, {
            contentHTML: "Mobile Application",
            selector: "#mobileApplication",
            className: "",
            time: 35,
            isIcon: true
        }, {
            contentHTML: "Platform : iOS | Android",
            selector: "#mobileApplication-platform",
            className: "sign",
            time: 35
        }, {
            contentHTML: "Creative Design Layout",
            selector: "#mobileApplication-create",
            className: "sign",
            time: 35
        }, {
            contentHTML: "Web Security",
            selector: "#webScurity",
            className: "",
            time: 35,
            isIcon: true
        }, {
            contentHTML: "Intrusion Detection and Intrusion Prevention",
            selector: "#webScurity-intrusion",
            className: "sign",
            time: 35
        }, {
            contentHTML: "Disaster Recovery",
            selector: "#webScurity-disaster",
            className: "sign",
            time: 35
        }, {
            contentHTML: "Pentesting",
            selector: "#webScurity-pentesting",
            className: "sign",
            time: 35
        }],
            $loadingMessage = $('#loadingH1'),
            initDot = $('#loading'),
            loading = setInterval(function () {

            initDot.text().length == 5 ? initDot.text() : initDot.text(initDot.text() + '.');
        }, 350),
            run = setTimeout(function () {
            clearInterval(loading);
            $loadingMessage.hide();

            addStore(storeStringAnimation, 0);

            function addStore(store, index) {

                if (store.length <= 0 || !store[index]) return;

                var data = store[index],
                    $element = $(data.selector || '');

                if ($element.length <= 0) return;

                addTextDuring(0);

                function addTextDuring(at) {
                    var contentHTML = data.contentHTML;
                    if (contentHTML.length <= 0) return addStore(store, index + 1);
                    if (data.isIcon) {
                        $(data.selector + '-icon').addClass('icon-show');
                    }
                    var stringAdd = contentHTML.substring(0, at);
                    $element.addClass(data.className + ' cursor').text(stringAdd);
                    if (at < data.contentHTML.length) {
                        setTimeout(function () {
                            addTextDuring(at + 1);
                        }, data.time);
                    } else {
                        $element.removeClass('cursor');
                        addStore(store, index + 1);
                    }
                }
            }
        }, 1500);
    }
})(jQuery);