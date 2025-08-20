
//Event Click -> Get Value of the input
document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  const encodedCity = encodeURIComponent(city);
  window.location.href = "https://jonyboy61.github.io/weather-app/forecast/forecast.html?city=" + encodeURIComponent(city);


});

