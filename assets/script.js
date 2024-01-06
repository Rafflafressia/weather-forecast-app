var searchBox = document.querySelector(".search-box");
var searchBtn = document.querySelector(".search-button");

// api key variables
const apiKey = "0b04baa169e04847ef24e7586e4a2756";
const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const futureForecast = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q="









// Function for Current Weather
async function checkCurrentWeather(city){
    const response = await fetch(currentWeatherUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    var weatherCondition = data.weather[0].icon;

    document.querySelector(".city-name").innerHTML = data.name + " " + `<i class="${weatherCondition}"></i>`;
    document.querySelector(".temp").innerHTML = "Temp:" + " "+ Math.round(data.main.temp) + "°C"; 
    document.querySelector(".humidity").innerHTML = "Humidity:" + " " + data.main.humidity + "%";
    document.querySelector(".winds").innerHTML = "Wind Speeds:" + " " + data.wind.speed + "km/h";

}

// Finds the 5 Day Forecast
async function checkFutureForecast(city){
    const response = await fetch(futureForecast + city + `&appid=${apiKey}`);
    var data = await response.json();
    
    console.log(data);

    // Crudely gets the 5 Future Days
    for (i=3; i<data.list.length; i+=8){
        console.log(data.list[i]);

        // appends list elements to the UL Dom element
        var listItem = document.createElement('li');
        document.querySelector('ul').appendChild(listItem);
        listItem.className = "day"
        // Create p element for each data set
        var pDate = document.createElement('p');
        document.querySelector('li').appendChild(pDate);
        var pTemp = document.createElement('p');
        document.querySelector('li').appendChild(pTemp);
        var pHumidity = document.createElement('p');
        document.querySelector('li').appendChild(pHumidity);
        var pWind = document.createElement('p');
        document.querySelector('li').appendChild(pWind);

        // add Text Content to each new element
        pTemp.textContent = Math.round(data.list[i].main.temp);

        

    }

}

// Creates a Button with the last searched city
function createHistoryBtn (){

    // Creates a Button With the last Search City
    var historyBtn = document.createElement('button');
    historyBtn.textContent = searchBox.value;
    historyBtn.className = 'historyBtn'
    document.querySelector(".weather-search").appendChild(historyBtn);

    // Adds an Event Listener to run the button's text value back through the check weather function
    historyBtn.addEventListener("click", function(){
        checkCurrentWeather(historyBtn.textContent);
    })

}

searchBtn.addEventListener("click", function(){
    checkCurrentWeather(searchBox.value);
    checkFutureForecast(searchBox.value);
    createHistoryBtn();
})