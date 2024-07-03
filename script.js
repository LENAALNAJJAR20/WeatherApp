
function getWeather() {
const apiKey =`f0197398fc58ded17e610f0ed4d95900`;
const city = document.getElementById('city').value;

if (!city){
    alert('please enter a city');
    return;
}

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
 
fetch(currentWeatherUrl)
.then(response => response.json())
.then(data => {
displayWeather(data);
})
.catch(error => {
  console.error('error fetching current weather data',error);
  alert('error fetching current weather data.please try again')

});


fetch(forecastUrl)
.then(response => response.json())
.then(data => {
displayHourlyForecast(data.list);
})
.catch(error => {
  console.error('error fetching Hourly Forecast data',error);
  alert('error fetching Hourly Forecast data.please try again')

});


}
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

  
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if(data.cod === '404'){
        weatherInfoDiv.innerHTML =`<p>${data.message}</p>`;
    }else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

         const temperatureHTML =`
      <p>${temperature}°C</p>
         `;

         const weatherHTML =`
         <p>${cityName}</p>
           <p>${description}</p>
            `;
            tempDivInfo.innerHTML = temperatureHTML;
            weatherInfoDiv.innerHTML = weatherHTML;
            weatherIcon.src = iconUrl;
            weatherIcon.alt = description;
             showImage();

    }

}

 function displayHourlyForecast(hourlyData){
  const hourlyForecastDiv = document.getElementById('hourly-forecast');
  const next24Hours = hourlyData.slice(0,8);
  next24Hours.forEach(item =>{
  const datetime = new Date(item.dt * 1000);
  const hour = datetime.getHours();
  const temperature = Math.round(item.main.temp - 273.15);
  const iconCode =item.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

  const hourlyItemHtml = `
             <div class="hourly-item">
                 <span>${hour}:00</span>
                  <img src="${iconUrl}" alt="Hourly Weather Icon">
                   <span>${temperature}°C</span>
              </div>
          `;
       hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });

 }
 function showImage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display ='block';
 }



















// function displayHourlyForecast(hourlyData) {
//     const hourlyForecastDiv = document.getElementById('hourly-forecast');

//     const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

//     next24Hours.forEach(item => {
//         const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
//         const hour = dateTime.getHours();
//         const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
//         const iconCode = item.weather[0].icon;
//         const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

//         const hourlyItemHtml = `
//             <div class="hourly-item">
//                 <span>${hour}:00</span>
//                 <img src="${iconUrl}" alt="Hourly Weather Icon">
//                 <span>${temperature}°C</span>
//             </div>
//         `;

//         hourlyForecastDiv.innerHTML += hourlyItemHtml;
//     });
// }

// function showImage() {
//     const weatherIcon = document.getElementById('weather-icon');
//     weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
// }
