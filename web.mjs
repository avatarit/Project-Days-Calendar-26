import daysData from "./days.json" with { type: "json" };
import { getCommemorativeDate } from "./date-utils.mjs"; 

const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const calendarEl = document.getElementById("calendar");
const titleEl = document.getElementById("month-title");

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth(); 

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];


function setupJumpControls() {
  monthSelect.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    const opt = document.createElement("option");
    opt.value = String(i);
    opt.textContent = monthNames[i];
    monthSelect.appendChild(opt);
  }

  yearSelect.innerHTML = "";
  for (let y = 2015; y <= 2040; y++) {
    const opt = document.createElement("option");
    opt.value = String(y);
    opt.textContent = String(y);
    yearSelect.appendChild(opt);
  }

  monthSelect.value = String(currentMonth);
  yearSelect.value = String(currentYear);
}


function getEventsForMonth(year, monthIndex) {
  const eventsByDay = {};

  for (const item of daysData) {
    const date = getCommemorativeDate(year, item);
    if (!date) continue;

    if (date.getUTCFullYear() === year && date.getUTCMonth() === monthIndex) {
      const dayNumber = date.getUTCDate();

      if (!eventsByDay[dayNumber]) eventsByDay[dayNumber] = [];
      eventsByDay[dayNumber].push(item.name);
    }
  }

  return eventsByDay;
}


function renderMonth(year, monthIndex) {
  calendarEl.innerHTML = "";

  const monthName = new Date(year, monthIndex, 1).toLocaleString("en-GB", { month: "long" });
  titleEl.textContent = `${monthName} ${year}`;

  monthSelect.value = String(monthIndex);
  yearSelect.value = String(year);

  const headers = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  for (const h of headers) {
    const cell = document.createElement("div");
    cell.className = "day header";
    cell.textContent = h;
    calendarEl.appendChild(cell);
  }

  const startWeekday = new Date(year, monthIndex, 1).getDay();

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const eventsByDay = getEventsForMonth(year, monthIndex);

  for (let i = 0; i < startWeekday; i++) {
    const empty = document.createElement("div");
    empty.className = "day empty";
    calendarEl.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "day";
    cell.textContent = day;

    if (eventsByDay[day]) {
      cell.classList.add("special");

      for (const eventName of eventsByDay[day]) {
        const label = document.createElement("div");
        label.className = "event-label";
        label.textContent = eventName;
        cell.appendChild(label);
      }
    }

    calendarEl.appendChild(cell);
  }
  let totalDaysShown = startWeekday + daysInMonth;

  while (totalDaysShown % 7 !== 0) {
  const empty = document.createElement("div");
  empty.className = "day empty";
  calendarEl.appendChild(empty);
  totalDaysShown++;
}
}


nextButton.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderMonth(currentYear, currentMonth);
});

prevButton.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderMonth(currentYear, currentMonth);
});

monthSelect.addEventListener("change", () => {
  currentMonth = Number(monthSelect.value);
  renderMonth(currentYear, currentMonth);
});

yearSelect.addEventListener("change", () => {
  currentYear = Number(yearSelect.value);
  renderMonth(currentYear, currentMonth);
});


setupJumpControls();
renderMonth(currentYear, currentMonth);
