const input = document.querySelector('input');
const weatherDiv = document.querySelector('#weather');
const preloader = document.querySelector('#preloader');


//toggles inputs style when focusing
input.addEventListener('focusin', toggleClass);
input.addEventListener('focusout', toggleClass);

function toggleClass() {
    input.classList.toggle('city_name');
};

//triggers function that fetch for weather
input.addEventListener('keydown', (e) => {

    if (e.code === 'Enter') {
        preloader.classList.remove('preloader');
        fetchWeather(e.target.value);
        weatherDiv.classList.add('scale-out');
    };
});

async function fetchWeather(city) {

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c09e360baf439a72fb2afb607f153694`);
        input.value = '';
        createElements(response.data);
    }

    catch (error) {
        if (error.response) {
            requestProblem((error.response.data.message).toUpperCase())
        }
        else {
            requestProblem('network problem')
        };
    };
}

//creates html with fetched data
async function createElements({ main, name, weather, coord }) {
    const { main: conditions, icon } = weather[0];

    weatherDiv.innerHTML = `
    <p id="city" class="card-title">${name}<span class="country">${await getCountry(coord['lat'], coord['lon'])}</span></p>
    <p id="conditions">${conditions}</p>
    <div class="card-content" style="padding-top: 0">
    <div class="col s4"></div>
    <span class="degree col s4">${Math.round(main.temp)}&#176</span>
    <img class="col s4" src="http://openweathermap.org/img/wn/${icon}@2x.png">
    <div class="row">
    <div class="col s12"><p style="text-align: center; font-weight: bold;: medium">
    max:  ${Math.round(main.temp_max)}&#176  &nbsp  min:  ${Math.round(main.temp_min)}&#176</p></div>
    </div>
    </div>
    `;

    weatherDiv.classList.remove('scale-out');
    preloader.classList.add('preloader');


};

//shows client's country weather on startup
window.addEventListener('DOMContentLoaded', () => {

    weatherDiv.classList.add('scale-out');

    async function getLocation() {
        try {
            const ip = await axios.get('https://api.ipify.org/')
            const location = await axios.get(`http://api.ipstack.com/${ip.data}?access_key=2aa0ad6c48283a995770a0dfc8a2602d`)
            const latLong = [Math.round(location.data.latitude), Math.round(location.data.longitude)]
            fetchWeather(location.data.location.capital);

        }

        catch (error) {
            fetchWeather('polska')
        };
    };

    getLocation();
});


async function getCountry(lat, lng) {
    try {
        const country = await axios.get(`http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&username=tomaszkowalik`)
        const countryName = country.data.geonames[0]['countryName']
        return countryName
    }

    catch (error) {
        return ''
    };
};

//maintains error at first call
function requestProblem(message) {
    weatherDiv.classList.remove('scale-out');

    weatherDiv.innerHTML = `
    <p id="city" class="card-title">${message}</p>
    <p style="text-align:center; margin-top:2em;">
    <i class="material-icons prefix" style=" font-size: xxx-large;">cloud_off</i></p>
    `;
    preloader.classList.add('preloader');
}
