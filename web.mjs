import daysData from "./days.json" with { type: "json" };

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

function renderMonth(year, monthIndex) {
  calendarEl.innerHTML = "";

  // Title
  const monthName = new Date(year, monthIndex, 1).toLocaleString("en-GB", { month: "long" });
  titleEl.textContent = `${monthName} ${year}`;

  // keep dropdowns in sync
  monthSelect.value = String(monthIndex);
  yearSelect.value = String(year);

  // Weekday headers (Sunday-first)
  const headers = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  for (let h of headers) {
    const cell = document.createElement("div");
    cell.className = "day header";
    cell.textContent = h;
    calendarEl.appendChild(cell);
  }

  // First day weekday
  const startWeekday = new Date(year, monthIndex, 1).getDay();

  // Days in month
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  // Padding
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

    // (Later) we will use daysData here to mark commemorative days

    calendarEl.appendChild(cell);
  }
}

// Button events
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



// Start
setupJumpControls();
renderMonth(currentYear, currentMonth);
