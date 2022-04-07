const currentWeatherReqUrl =
  "https://api.openweathermap.org/data/2.5/weather?id=3521342&appid=6b9da70692451588de922257bbe9e1ce";

const forecastReqUrl =
  "https://api.openweathermap.org/data/2.5/forecast?id=3521342&units=imperial&appid=6b9da70692451588de922257bbe9e1ce";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function kToF(valNum) {
  valNum = parseFloat(valNum);
  return ((valNum - 273.15) * 1.8 + 32).toFixed();
}

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

function dayOfWeek(rawdate) {
  const data = new Date(rawdate);
  const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = daysOfTheWeek[data.getUTCDay()];
  const date = pad(data.getUTCDate(), 2);

  return day + " " + date;
}

fetch(currentWeatherReqUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const weather = jsonObject;
    const tempElement = document.querySelector(".currentTemp");
    tempElement.textContent = kToF(weather["main"]["temp"]) + "°F";
    let tooltipContent =
      capitalizeFirstLetter(weather["weather"]["0"]["description"]) +
      "\nFeels Like:    " +
      kToF(weather["main"]["feels_like"]) +
      "°F" +
      "\nHumidity:    " +
      weather["main"]["humidity"] +
      "%\n";
    tempElement.setAttribute("data-hover", tooltipContent);
  });

fetch(forecastReqUrl)
  .then((response) => response.json())
  .then((jsonObject) => {
    const forecast = jsonObject["list"].filter((day) => {
      if (day.dt_txt.includes("12:00:00")) {
        return day;
      }
    });

    const days = 5;
    const forecastElement = document.querySelector(".forecast");
    const highTemps = [];
    const weatherIcons = [];
    const dates = [];

    //populate data
    for (let i = 0; i < days; i++) {
      highTemps.push(forecast[i]["main"]["temp_max"].toFixed(0));
      weatherIcons.push(forecast[i]["weather"]["0"]["icon"]);
      dates.push(dayOfWeek(forecast[i]["dt_txt"]));
    }

    //deploy data
    for (let i = 0; i < days; i++) {
      const cardElement = document.createElement("div");
      const day = document.createElement("h3");
      const highTempElement = document.createElement("h3");
      const weatherImg = document.createElement("img");

      day.innerText = dates[i];
      highTempElement.innerText = highTemps[i] + "°";
      weatherImg.setAttribute(
        "src",
        "https://openweathermap.org/img/w/" + weatherIcons[i] + ".png"
      );

      cardElement.appendChild(day);
      cardElement.appendChild(highTempElement);
      cardElement.appendChild(weatherImg);
      cardElement.setAttribute("class", "card");

      if (i == 4) {
        cardElement.setAttribute("id", "last");
      }
      forecastElement.appendChild(cardElement);
    }
  });
