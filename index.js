const http = require('http');
const api = require('./api.json');

function errormessage(error) {
    console.error("You had the following error: " + error);
    console.log("If you had something along the lines of undefined for display_location...")
    console.log("...chances are you had a typo or incorrect location.")
    console.log("You want to put in either zipcode(25301) or first state then city(WV Charleston).")
}

function message(weatherStats) {
    console.log("The current temperature in " + weatherStats.display_location.city + " is " + weatherStats.temp_f + ".")
}

function get(location) {
    console.log(location)
    try {
        var request = http.get('http://api.wunderground.com/api/adde57e270ae1280/conditions/q/' + location + '.json',
            response => {
                // console.log(request);
                var body = "";
                response.on('data', dataChunk => {
                    body += dataChunk;
                });
                response.on('end', () => {
                    // console.log(body);
                    weather = JSON.parse(body);
                    try {
                        message(weather.current_observation);
                    } catch (e) {

                        errormessage(e)
                    };
                    // console.log(weather.current_observation)
                    // message(weather.current_observation);
                    // var currentWeather = parsed.current_observation.temp_f;
                    // console.log(currentWeather);
                    // console.log(parsed.response.results);
                    // var x = parsed.response.results[1].state;
                    // console.log(x);
                    // x.forEach(function(client) {
                    //     console.log(client.states);
                    // });
                    // console.log(parsed.response.results[0].forEach(states));

                });
            });
    } catch (error) {
        errormessage(error)
    }

    // response.on('error', e => errormessage(e));
};


module.exports.get = get;