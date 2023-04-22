const fetchDataBtn = document.getElementById('fetch-data');
const mapContainer = document.getElementById('map-container');
const weatherContainer = document.getElementById('weather-container');

fetchDataBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log(lat,lng)

      var iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15383.103388572636!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1682166388149!5m2!1sen!2sin`);
    iframe.setAttribute('width', '400');
    iframe.setAttribute('height', '250');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('style', 'border:0');
    iframe.setAttribute('allowfullscreen', '');
    mapContainer.appendChild(iframe);



      // Fetch weather data
      const apiKey = '06a026ecf391bf29a1487f542565b79d';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
          const location=data.name;
          const latitude=data.coord.lat;
          const longitude=data.coord.lon;
          const timeZone=data.timezone;
          const pressure=data.main.pressure;
          const feelslike=data.main.feels_like;
          const temp = data.main.temp;
          const humidity = data.main.humidity;
          const windSpeed = data.wind.speed;
          const description = data.weather[0].description;

          // weather data
          weatherContainer.innerHTML = `
          <div class="column">
          <div>
            <p>Location: ${location}</p>
            <p>Latitude: ${latitude}</p>
            <p>Longitude: ${longitude}</p>
            <p>TimeZone: ${timeZone}</p>
            <p>Wind speed: ${windSpeed} m/s</p>
          </div>
          <div>
            <p>Wind pressure: ${pressure}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Feels Like: ${feelslike}</p>
            <p>Temperature: ${temp}°C</p>
            <p>Description: ${description}</p>
            </div>
            </div>
          `;
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });

    }, error => {
      console.error('Error getting current position:', error);
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
});
