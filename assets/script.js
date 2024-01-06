var searchBox = document.querySelector(".search-box");
var searchBtn = document.querySelector(".search-button");
var forecastContainer = document.querySelector(".futureForecast");

// api key variables
const apiKey = "0b04baa169e04847ef24e7586e4a2756";
const currentWeatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const futureForecast =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

// Function for Current Weather
function checkCurrentWeather(city) {
  fetch(currentWeatherUrl + city + `&appid=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var weatherCondition = data.weather[0].icon;
      var weatherIconUrl = "http://openweathermap.org/img/w/" + weatherCondition + ".png";

    //Convert the Date into a readable format
      var dateData = data.dt;
      var currentDate = Date(dateData);
      var day = dayjs(currentDate).format("DD/MM/YYYY");
    
    //Adds the information retrieved from the API
      document.querySelector(".city-name").innerHTML =
        data.name + " " + day + " " + `<img src="${weatherIconUrl}"></img>`;
      document.querySelector(".temp").innerHTML =
        "Temp:" + " " + Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML =
        "Humidity:" + " " + data.main.humidity + "%";
      document.querySelector(".winds").innerHTML =
        "Wind Speeds:" + " " + data.wind.speed + "km/h";
    })
    .catch(function(err){
        console.log(err);
    });
}

// Finds the 5 Day Forecast
async function checkFutureForecast(city) {
  const response = await fetch(futureForecast + city + `&appid=${apiKey}`);
  var data = await response.json();

  console.log(data);

  forecastContainer.innerHTML = " ";

  // Crudely gets the 5 Future Days
  for (i = 3; i < data.list.length; i += 8) {
    console.log(data.list[i]);

    // appends list elements to the Div Dom element
    var pContainer = document.createElement("div");
    pContainer.classList.add("day");

    // Create p element for each data set
    var pDate = document.createElement("h3");
    var pTemp = document.createElement("p");
    var pHumidity = document.createElement("p");
    var pWinds = document.createElement("p");

    // retrieve future dates
    var dateData = data.list[i].dt;
    var futureDate = new Date(dateData * 1000);
    var fday = futureDate.toLocaleDateString();

    console.log(fday);

    var weatherCondition = data.list[i].weather[0].icon;
    var weatherIconUrl = "http://openweathermap.org/img/w/" + weatherCondition + ".png";

    // add Text Content to each new element
    pDate.innerHTML = fday + " " + `<img src="${weatherIconUrl}"></img>`;
    pTemp.textContent = "Temp: " + Math.round(data.list[i].main.temp);
    pHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
    pWinds.textContent = "Wind Speed: " + data.list[i].wind.speed + " km/s";

    pContainer.append(pDate, pTemp, pHumidity, pWinds);
    forecastContainer.append(pContainer);
  }
}

// Creates a Button with the last searched city
function createHistoryBtn() {
  // Creates a Button With the last Search City
  var historyBtn = document.createElement("button");
  historyBtn.textContent = searchBox.value;
  historyBtn.className = "historyBtn";
  document.querySelector(".weather-search").appendChild(historyBtn);

  // Adds an Event Listener to run the button's text value back through the check weather function
  historyBtn.addEventListener("click", function () {
    checkCurrentWeather(historyBtn.textContent);
    checkFutureForecast(historyBtn.textContent);
  });
}

searchBtn.addEventListener("click", function () {
  checkCurrentWeather(searchBox.value);
  checkFutureForecast(searchBox.value);
  createHistoryBtn();
});

checkCurrentWeather("Toronto");
checkFutureForecast("toronto");
