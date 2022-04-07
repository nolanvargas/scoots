const credits = "OpenWeather(TM): Weather data provider \n Google maps (c)";

function attribute() {
  const popup = document.querySelector(".attributes");
  popup.innerHTML =
    '<span class="helper"></span><div><div class="popupCloseButton" onclick="closePopup()">&times;</div><p>' +
    credits +
    "</p></div>";
  console.log("showing");
  const element = document.querySelector(".attributes");
  element.style.display = "block";
}

function closePopup() {
  const element = document.querySelector(".attributes");
  element.style.display = "none";
}
