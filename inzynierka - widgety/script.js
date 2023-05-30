DayName = new Array(7)
DayName[0] = "Sunday"
DayName[1] = "Monday"
DayName[2] = "Tuesday"
DayName[3] = "Wednesday"
DayName[4] = "Thursday"
DayName[5] = "Friday"
DayName[6] = "Saturday"

MonthName = new Array(12)
MonthName[0] = "January"
MonthName[1] = "February"
MonthName[2] = "March"
MonthName[3] = "April"
MonthName[4] = "May"
MonthName[5] = "June"
MonthName[6] = "July"
MonthName[7] = "August"
MonthName[8] = "September"
MonthName[9] = "October"
MonthName[10] = "November"
MonthName[11] = "December"

function getDateStr() {
  var Today = new Date()
  var WeekDay = Today.getDay()
  var Month = Today.getMonth()
  var Day = Today.getDate()
  var Year = Today.getFullYear()

  if (Year <= 99)
    Year += 1900

  return DayName[WeekDay] + "," + " " + Day + " " + MonthName[Month] + ", " + Year
}


function myFunction() {
  var no = document.getElementById("no");
  var option = no.options[no.selectedIndex].text;
  var txt = document.getElementById("result").value;
  txt = txt + option;
  document.getElementById("result").value = txt;


  
}/* Time countdown */

// Set the date we're counting down to
var countDownDate = new Date("Jan 1, 2024 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);



/* Progress Bar*/

const progressBar = document.getElementById("progress-bar");
const progressNext = document.getElementById("progress-next");
const progressPrev = document.getElementById("progress-prev");
const steps = document.querySelectorAll(".step");
let active = 1;

progressNext.addEventListener("click", () => {
  active++;
  if (active > steps.length) {
    active = steps.length;
  }
  updateProgress();
});

progressPrev.addEventListener("click", () => {
  active--;
  if (active < 1) {
    active = 1;
  }
  updateProgress();
});

const updateProgress = () => {
  steps.forEach((step, i) => {
    if (i < active) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
  progressBar.style.width = ((active - 1) / (steps.length - 1)) * 100 + "%";
  if (active === 1) {
    progressPrev.disabled = true;
  } else if (active === steps.length) {
    progressNext.disabled = true;
  } else {
    progressPrev.disabled = false;
    progressNext.disabled = false;
  }
};



/* clock */

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('txt').innerHTML = h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
  return i;
}




// calendar//

function generate_year_range(start, end) {
  var years = "";
  for (var year = start; year <= end; year++) {
    years += "<option value='" + year + "'>" + year + "</option>";
  }
  return years;
}

today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");


createYear = generate_year_range(1970, 2050);
/** or
* createYear = generate_year_range( 1970, currentYear );
*/

document.getElementById("year").innerHTML = createYear;

var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute('data-lang');

var months = "";
var days = "";

var monthDefault = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var dayDefault = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

if (lang == "en") {
  months = monthDefault;
  days = dayDefault;
} else if (lang == "id") {
  months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  days = ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
} else if (lang == "fr") {
  months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
} else {
  months = monthDefault;
  days = dayDefault;
}


var $dataHead = "<tr>";
for (dhead in days) {
  $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";

//alert($dataHead);
document.getElementById("thead-month").innerHTML = $dataHead;


monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);



function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

  var firstDay = (new Date(year, month)).getDay();

  tbl = document.getElementById("calendar-body");


  tbl.innerHTML = "";


  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  // creating all cells
  var date = 1;
  for (var i = 0; i < 6; i++) {

    var row = document.createElement("tr");


    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cell = document.createElement("td");
        cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        cell = document.createElement("td");
        cell.setAttribute("data-date", date);
        cell.setAttribute("data-month", month + 1);
        cell.setAttribute("data-year", year);
        cell.setAttribute("data-month_name", months[month]);
        cell.className = "date-picker";
        cell.innerHTML = "<span>" + date + "</span>";

        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.className = "date-picker selected";
        }
        row.appendChild(cell);
        date++;
      }


    }

    tbl.appendChild(row);
  }

}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}


/* color */


// Pobranie diva do wyświetlenia slidera
const sliderContainer = document.getElementById("slider-container");

// Stworzenie suwaka
const slider = document.createElement("input");
slider.type = "range";
slider.min = "0";
slider.max = "100";
slider.value = "50";
sliderContainer.appendChild(slider);

// Stworzenie elementu do wyświetlania wartości suwaka
const sliderValue = document.createElement("p");
sliderValue.innerHTML = "Wartość suwaka: " + slider.value;
sliderContainer.appendChild(sliderValue);

// Nasłuchwanie zmian na suwaku
slider.addEventListener("input", function () {
  sliderValue.innerHTML = "Wartość suwaka: " + slider.value;
});


/* widget pogodowy */

// API key for OpenWeatherMap
const API_KEY = 'your-api-key';

// Get weather data for current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showWeather);
} else {
  document.querySelector('#weather').innerHTML = 'Geolocation is not supported by this browser.';
}

// Show weather data for current location
function showWeather(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const temperature = Math.round(data.main.temp - 273.15);
      const weather = data.weather[0].description;
      document.querySelector('#weather').innerHTML = `${temperature}°C, ${weather}`;
    })
    .catch(error => {
      document.querySelector('#weather').innerHTML = 'An error occurred while retrieving weather data.';
    });
}