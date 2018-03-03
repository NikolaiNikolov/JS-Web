function attachEvents() {
    const baseUrl = 'https://judgetests.firebaseio.com/';
    const forecastDiv = $('#forecast');
    const current = $('#current');
    const upcomingDiv = $('#upcoming');
    const weatherSymbols = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;'
    };
    $('#submit').click(getWeather);

    function getWeather() {
        request("GET", "locations.json").then(getCurrentConditions).catch(displayError);
    }

    function getCurrentConditions(data) {
        let locationName = $('#location').val();
        let location = data.filter(o => o.name === locationName)[0];

        if (location === undefined) {
            displayError('No such location.');
            return;
        }
        let todayWeatherP = request("GET", `forecast/today/${location.code}.json`);
        let upcomingWeatherP = request("GET", `forecast/upcoming/${location.code}.json`);
        Promise.all([todayWeatherP, upcomingWeatherP]).then(displayWeather).catch(displayError);
    }

    function displayWeather([today, upcoming]) {
        current.empty();
        current.append($('<div class="label">Current conditions</div>'))
            .append($(`<span class="condition symbol">${weatherSymbols[today.forecast.condition]}</span>`));
        let condition = $('<span class="condition"></span>');
        condition.append($(`<span class="forecast-data">${today.name}</span>`))
            .append($(`<span class="forecast-data">${today.forecast.low}&#176;/${today.forecast.high}&#176;</span>`))
            .append($(`<span class="forecast-data">${today.forecast.condition}</span>`));
        current.append(condition);

        upcomingDiv.empty();
        upcomingDiv.append($('<div class="label">Three-day forecast</div>'));

        for (let forecast of upcoming.forecast) {
            let upcomingSpan = $('<span class="upcoming"></span>');
            upcomingSpan.append($(`<span class="symbol">${weatherSymbols[forecast.condition]}</span>`))
                .append($(`<span class="forecast-data">${forecast.low}&#176;/${forecast.high}&#176;</span>`))
                .append($(`<span class="forecast-data">${forecast.condition}</span>`));
            upcomingDiv.append(upcomingSpan);
        }
        forecastDiv.css('display', 'block');
    }

    function displayError(err) {
        console.log(err);
    }

    function request(method, endpoint) {
        return $.ajax({
            url: baseUrl + endpoint,
            method: method,
        });
    }
}