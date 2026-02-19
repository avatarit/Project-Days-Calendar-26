import fs from "node:fs";
import path from "node:path";
import { getCommemorativeDate } from "./date-utils.mjs";

const __dirname = path.resolve();
const daysData = JSON.parse(fs.readFileSync(path.join(__dirname, "days.json"), "utf-8"));

function yyyymmddUTC(d) {
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}
let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Project//Days Calendar//EN\n";

for (let year = 2020; year <= 2030; year++) {
  for (const dayEntry of daysData) {
    const date = getCommemorativeDate(year, dayEntry);

    const end = new Date(date);
    end.setUTCDate(end.getUTCDate() + 1);

    icsContent += "BEGIN:VEVENT\n";
    icsContent += `UID:${dayEntry.name}-${yyyymmddUTC(date)}\n`;
    icsContent += `SUMMARY:${dayEntry.name}\n`;
    icsContent += `DTSTART;VALUE=DATE:${yyyymmddUTC(date)}\n`;
    icsContent += `DTEND;VALUE=DATE:${yyyymmddUTC(end)}\n`;
    icsContent += "END:VEVENT\n";
  }
}

icsContent += "END:VCALENDAR\n";

fs.writeFileSync(path.join(__dirname, "days.ics"), icsContent);
console.log("ICS file generated: days.ics");
