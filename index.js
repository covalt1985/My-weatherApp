const input = document.querySelector('input');
const weatherDiv = document.querySelector('#weather');

//toggles inputs style when focusing
input.addEventListener('focusin', toggleClass);
input.addEventListener('focusout', toggleClass);
function toggleClass() {
    input.classList.toggle('city_name');
};

//triggers function that fetch for weather
input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        fetchWeather(e.target.value);
        weatherDiv.classList.add('scale-out');
    };
});

async function fetchWeather(city) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c09e360baf439a72fb2afb607f153694`);
        input.value = '';
        console.log(response.data);
        createElements(response.data);
    }
    catch (error) {
        if (error.response) {
            console.log('Error:', error.response.data.message);
        };
    };
};

//creates html with fetched data
function createElements({ main, name, weather }) {
    const container = document.querySelector('#weather');
    const { main: conditions, icon } = weather[0];
    container.innerHTML = `
    <p id="city" class="card-title">${name}</p>
    <p id="conditions">${conditions}</p>
    <div class="card-content" style="padding-top: 0">
    <div class="col s4"></div>
    <span class="degree col s4">${Math.round(main.temp)}&#176</span>
    <img class="col s4" src="http://openweathermap.org/img/wn/${icon}@2x.png">
    <div class="row">
    <div class="col s12"><p style="text-align: center; -webkit-text-stroke-width: medium">
    max:  ${Math.round(main.temp_max)}&#176  &nbsp  min:  ${Math.round(main.temp_min)}&#176</p></div>
    </div>
    </div>
    `;
    weatherDiv.classList.remove('scale-out');
};

//shows clients country weather on startup
window.addEventListener('DOMContentLoaded', () => {
    weatherDiv.classList.add('scale-out');
    async function getLocation() {
        try {
            const ip = await axios.get('https://api.ipify.org/')
            const location = await axios.get(`http://api.ipstack.com/${ip.data}?access_key=2aa0ad6c48283a995770a0dfc8a2602d`)
            fetchWeather(location.data.country_name);
        }
        catch (error) {
            if (error.response) {
                console.log('Error:', error.response.data.message);
            };
        };
    };
    getLocation();
});

//for future purpose
/* function createWidget({ main, name }) {
    console.log('feels like:', Math.round(main.feels_like));
    console.log(name);
}; */


