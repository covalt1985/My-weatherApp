async function fetchWeather(city) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c09e360baf439a72fb2afb607f153694`);
        console.log(response.data);
    }
    catch (error) {
        if (error.response) {
            console.log('Error:', error.response.data.message);
        };
    };
};

const input = document.querySelector('input');
const button = document.querySelector('a');

input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) fetchWeather(e.target.value);
});

button.addEventListener('click', ()=>{
    fetchWeather(input.value);
})




