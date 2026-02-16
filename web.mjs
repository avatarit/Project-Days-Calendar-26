import daysData from "./days.json" with { type: "json" };
import { getCommemorativeDate } from "./date-utils.mjs"; // change to "./common.mjs" if that's where your function is

const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const calendarEl = document.getElementById("calendar");
const titleEl = document.getElementById("month-title");

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth(); // 0-11

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// -------------------- Dropdown setup --------------------

function setupJumpControls() {
  // months
  monthSelect.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    const opt = document.createElement("option");
    opt.value = String(i);
    opt.textContent = monthNames[i];
    monthSelect.appendChild(opt);
  }

  // years
  yearSelect.innerHTML = "";
  for (let y = 2015; y <= 2040; y++) {
    const opt = document.createElement("option");
    opt.value = String(y);
    opt.textContent = String(y);
    yearSelect.appendChild(opt);
  }

  // set current values
  monthSelect.value = String(currentMonth);
  yearSelect.value = String(currentYear);
}

// -------------------- Commemorative days --------------------

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

// -------------------- Render calendar --------------------

function renderMonth(year, monthIndex) {
  // Clear old calendar
  calendarEl.innerHTML = "";

  // Title
  const monthName = new Date(year, monthIndex, 1).toLocaleString("en-GB", { month: "long" });
  titleEl.textContent = `${monthName} ${year}`;

  // Keep dropdowns in sync
  monthSelect.value = String(monthIndex);
  yearSelect.value = String(year);

  // Weekday headers (Sunday-first)
  const headers = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  for (const h of headers) {
    const cell = document.createElement("div");
    cell.className = "day header";
    cell.textContent = h;
    calendarEl.appendChild(cell);
  }

  // First day weekday (0-6)
  const startWeekday = new Date(year, monthIndex, 1).getDay();

  // Days in month
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  // Build events map for this month
  const eventsByDay = getEventsForMonth(year, monthIndex);

  // Padding before day 1
  for (let i = 0; i < startWeekday; i++) {
    const empty = document.createElement("div");
    empty.className = "day empty";
    calendarEl.appendChild(empty);
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "day";
    cell.textContent = day;

    // Highlight + list events (supports multiple per day)
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
}

// -------------------- Navigation --------------------

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

// -------------------- Start --------------------

setupJumpControls();
renderMonth(currentYear, currentMonth);
