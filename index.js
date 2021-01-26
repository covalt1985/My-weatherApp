async function fetchWeather(city){
const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c09e360baf439a72fb2afb607f153694`)
console.log((response.data.main.temp - 272).toFixed(1))
}

const input = document.querySelector('input')