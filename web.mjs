// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

window.onload = function() {
    const calendarEl = document.getElementById("calendar");
    const titleEl = document.getElementById("month-title");
    
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth(); // 0-11
    
    // Sunday-first calendar (0 = Sunday)
    function renderMonth(year, monthIndex) {
      // Clear old calendar
      calendarEl.innerHTML = "";
    
      // Title
      const monthName = new Date(year, monthIndex, 1).toLocaleString("en-GB", { month: "long" });
      titleEl.textContent = `${monthName} ${year}`;
    
      // Weekday headers (optional but nice)
      const headers = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      for (const h of headers) {
        const cell = document.createElement("div");
        cell.className = "day header";
        cell.textContent = h;
        calendarEl.appendChild(cell);
      }
    
      // First day weekday (0-6)
      const firstDay = new Date(year, monthIndex, 1);
      const startWeekday = firstDay.getDay();
    
      // Days in month
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    
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
        calendarEl.appendChild(cell);
      }
    }

    const yearSelector=document.createElement("select");
    
    renderMonth(currentYear, currentMonth);
    
    nextButton.onclick = () => {
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
        renderMonth(currentYear, currentMonth);
      }

      prevButton.onclick = () => {
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
        renderMonth(currentYear, currentMonth);
      }
    }
