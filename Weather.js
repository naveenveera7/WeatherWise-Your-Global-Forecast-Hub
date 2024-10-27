var inputvalue = document.querySelector('#search')
// var btn = document.querySelector('#add')
var city = document.querySelector('#cityname')
var discrip = document.querySelector('#disc')
var temp = document.querySelector('#temp')
var feel=document.querySelector('#feels')
var hum = document.querySelector('#hum')
var pres = document.querySelector('#pres')
var wind = document.querySelector('#wind')

// for local data
var lcity = document.querySelector('#lcityname')
var ldiscrip = document.querySelector('#ldisc')
var ltemp = document.querySelector('#ltemp')
var lfeel=document.querySelector('#lfeels')
var lhum = document.querySelector('#lhum')
var lpres = document.querySelector('#lpres')
var lwind = document.querySelector('#lwind')
var lselec =document.querySelector('#sel')

apik ="e1c3416650ddef21c1f6bc18e7cd30ba"
function convertion(val)
{
    return (val - 273).toFixed(0)
}

inputvalue.addEventListener('keydown', function(event) 
{
  if (event.key === "Enter") {
    
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputvalue.value+'&appid='+apik)
    .then(res => res.json())

    .then(data => 
    {
      var nameval = data['name']
      var country = data['sys']['country']
      var descrip = data['weather'][0]['description']
      var temperature = data['main']['temp']
      var feelss = data['main']['feels_like']
      var pressure = data['main']['pressure']
      var humidity = data['main']['humidity']
      var windspeed = data['wind']['speed']

      city.innerHTML=`<span>${nameval}, ${country}<span>`
      temp.innerHTML = `<img src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-1024.png" alt="temp"><span>${ convertion(temperature)} °C<span>`
      feel.innerHTML = `Feels-like: <span>${convertion(feelss)} °C<span>`
      hum.innerHTML=`Humidity: <span>${humidity}%<span>`
      pres.innerHTML=`Pressure: <span> ${pressure} mb<span>`
      discrip.innerHTML = `SkyConditions: <span>${descrip}<span>`
      wind.innerHTML = `WindSpeed: <span>${windspeed} km/h<span>`

    })

    .catch(err => alert('You entered Wrong city name'))
  }
}
)

function fetchWeatherByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apik}`)
    .then(res => res.json())

    .then(data => {
      var lnameval = data['name'];
      var lcountry = data['sys']['country'];
      var ldescrip = data['weather'][0]['description'];
      var ltemperature = data['main']['temp'];
      var lfeelss = data['main']['feels_like'];
      var lpressure = data['main']['pressure'];
      var lhumidity = data['main']['humidity'];
      var lwindspeed = data['wind']['speed'];
      
      lcity.innerHTML = `<span>${lnameval}, ${lcountry}<span>`;
      ltemp.innerHTML = `<img src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-1024.png" alt="temp"><span>${convertion(ltemperature)} °C<span>`;
      lfeel.innerHTML = `Feels-like: <span>${convertion(lfeelss)} °C<span>`;
      lhum.innerHTML = `Humidity: <span>${lhumidity}%<span>`;
      lpres.innerHTML = `Pressure: <span>${lpressure} mb<span>`;
      ldiscrip.innerHTML = `SkyConditions:<span>${ldescrip}<span>`;
      lwind.innerHTML = `WindSpeed:<span>${lwindspeed} km/h<span>`;
      lselec.innerHTML=`${lnameval},${lcountry}`;
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      alert("Unable to fetch weather data.");
    });
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  
  fetchWeatherByCoords(lat, lon);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
  alert("Geolocation is not supported by this browser.");
}
