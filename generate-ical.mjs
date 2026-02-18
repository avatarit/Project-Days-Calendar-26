import fs from "node:fs";
import path from "node:path";
import { getCommemorativeDate } from "./date-utils.mjs";

const __dirname = path.resolve();
const daysData = JSON.parse(fs.readFileSync(path.join(__dirname, "days.json"), "utf-8"));

let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//YourProject//Days Calendar//EN\n";

for (let year = 2020; year <= 2030; year++) {
  for (const dayEntry of daysData) {
    const date = getCommemorativeDate(year, dayEntry);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    icsContent += "BEGIN:VEVENT\n";
    icsContent += `SUMMARY:${dayEntry.name}\n`;
    icsContent += `DTSTART;VALUE=DATE:${yyyy}${mm}${dd}\n`;
    icsContent += `DTEND;VALUE=DATE:${yyyy}${mm}${dd}\n`;
    icsContent += "END:VEVENT\n";
  }
}

icsContent += "END:VCALENDAR\n";

fs.writeFileSync(path.join(__dirname, "commemorative-days.ics"), icsContent);
console.log("ICS file generated: commemorative-days.ics");
