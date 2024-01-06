var searchBox = document.querySelector(".search-box");
var searchBtn = document.querySelector(".search-button");

// api key variables
const apiKey = "0b04baa169e04847ef24e7586e4a2756";
const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="










async function checkCurrentWeather(city){
    const response = await fetch(currentWeatherUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.querySelector(".")
}



searchBtn.addEventListener("click", function(){
    checkCurrentWeather(searchBox.value);
})