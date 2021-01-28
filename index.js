const input = document.querySelector('input');
const button = document.querySelector('a');
const weatherDiv = document.querySelector('#weather')

//toggles style when focusing input
input.addEventListener('focusin', toggleClass);
input.addEventListener('focusout', toggleClass);
function toggleClass() {
    input.classList.toggle('city_name');
};

//events trigger func that fetches for weather
input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {fetchWeather(e.target.value);
    weatherDiv.classList.add('scale-out')};
});
button.addEventListener('click', () => {
    fetchWeather(input.value);
    weatherDiv.classList.add('scale-out');
});

async function fetchWeather(city) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c09e360baf439a72fb2afb607f153694`);
        input.value = '';
        console.log(response.data);
        createElements(response.data)
    }
    catch (error) {
        if (error.response) {
            console.log('Error:', error.response.data.message);
        };
    };
};

//creates html with fetched data
function createElements({ main, name, weather }) {
    const container = document.querySelector('#weather')
    const { main: conditions, icon } = weather[0];
    container.innerHTML = `
    <p id="city" class="card-title">${name}</p>
    <p id="conditions">${conditions}</p>
    <div class="card-content" style="padding-top: 0">
    <div class="col s4"></div>
    <span class="degree col s4">${Math.round(main.temp)}&#176</span>
    <img class="col s4" src="http://openweathermap.org/img/wn/${icon}@2x.png">
    </div>`;
    console.log(conditions, icon);
    weatherDiv.classList.remove('scale-out')
}

function createWidget({ main, name }) {
    console.log('temp min:', Math.round(main.temp_min))
    console.log('temp max:', Math.round(main.temp_max))
    console.log('feels like:', Math.round(main.feels_like))
    console.log(name)

}







