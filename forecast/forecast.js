const params = new URLSearchParams(window.location.search);
const city = params.get("city");

const apiKey = "bbd540317b85e7d98b609b0ba9c9ddd6";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=en`;

fetch(url)
  .then(response => response.json())
  .then(forecast => {
    // Filtrar previsões de meio-dia
    const dailyForecasts = forecast.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    );

    // Seleciona o container
    const container = document.getElementById("forecast-container");
    // Título da cidade no topo
    document.getElementById("city-title").textContent = `Weather in ${forecast.city.name}, ${forecast.city.country}`;

    // Botão de voltar (opcional)
    document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "../index.html"; // ou outra página de onde vieste
});

    // Mostra cidade e país no topo

    // Cria cards para os 5 dias
    dailyForecasts.forEach((forecast) => {
  const card = document.createElement("div");
  card.classList.add("forecast-card");

  // Aplica classes com base no estado do tempo
  const condition = forecast.weather?.[0]?.main || "";

  if (condition.includes("Rain")) {
    card.classList.add("rainy");
  } else if (condition.includes("Clear")) {
    card.classList.add("sunny");
  } else if (condition.includes("Clouds")) {
    card.classList.add("cloudy");
  } else if (condition.includes("Snow")) {
    card.classList.add("snowy");
  }

  // Resto do conteúdo
  const date = new Date(forecast.dt_txt).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

  card.innerHTML = `
    <h3>${date}</h3>
    <img src="${icon}" alt="${forecast.weather[0].description}">
    <p>${forecast.weather[0].description}</p>
    <p>${forecast.main.temp.toFixed(1)}°C</p>
  `;

  document.getElementById("forecast-container").appendChild(card);
});
  })
  .catch(err => {
    console.error("Erro ao obter dados:", err);
    document.getElementById("forecast-container").textContent = "Error!";
  });
