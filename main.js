function GetInfo() {
  const newName = document.getElementById("cityInput");
  const cityName = document.getElementById("cityName");
  cityName.innerHTML = "--" + newName.value + "--";

  const apiKey = "82c7e41fd0db8106d618bd49b17f9e52"; // replace if needed
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      newName.value
    )}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // For 5 days, get one forecast per day (every 24 hours = 8 intervals)
      for (let i = 0; i < 5; i++) {
        const dayIndex = i * 8;
        if (!data.list[dayIndex]) continue;
        const entry = data.list[dayIndex];

        document.getElementById("day" + (i + 1) + "Min").innerHTML =
          "Min: " + entry.main.temp_min.toFixed(1) + "°C";
        document.getElementById("day" + (i + 1) + "Max").innerHTML =
          "Max: " + entry.main.temp_max.toFixed(1) + "°C";

        document.getElementById("img" + (i + 1)).src =
          "https://openweathermap.org/img/wn/" +
          entry.weather[0].icon +
          ".png";
      }
    })
    .catch((err) =>
      alert("Something went wrong. Check your internet or API key.")
    );
}

function DefaultScreen() {
  document.getElementById("cityInput").defaultValue = "London";
  GetInfo();
}

// Day name logic
const d = new Date();
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function CheckDay(day) {
  return (d.getDay() + day) % 7;
}

// Display weekday names
for (let i = 0; i < 5; i++) {
  document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}
