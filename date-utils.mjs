export function monthNameToIndex(monthName) {
const months = [
    "January", "February", "March", "April", "May",
     "June", "July", "August", "September",
      "October", "November", "December"
];

return months.indexOf(monthName);
}

export function weekdayNameToIndex(dayName) {
    const days = [
        "Sunday", "Monday", "Tuesday", 
        "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    return days.indexOf(dayName);
}

export function getOccurrenceDate(year, monthIndex, weekdayIndex, occurrence) {
const firstOfMonth = new Date(year, monthIndex, 1);
const firstWeekDay = firstOfMonth.getDay();

let offset = weekdayIndex - firstWeekDay;
if (offset < 0) offset += 7;

let day = 1 + offset;

if (occurrence === "second") day += 7;
if (occurrence === "third") day += 14;

if (occurrence === "last") {
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0).getDate();
    const lastDate = new Date(year, monthIndex, lastDayOfMonth);
    const lastWeekday = lastDate.getDay();

    let backwardOffset = lastWeekday - weekdayIndex;
    if (backwardOffset < 0) backwardOffset += 7;

    day = lastDayOfMonth - backwardOffset;
}

return day;
}

export function getCommemorativeDate(dayEntry, year) {
    const monthIndex = monthNameToIndex(dayEntry.monthName);
    const weekdayIndex = weekdayNameToIndex(dayEntry.dayName);
    
const day = getOccurrenceDate(year, monthIndex, weekdayIndex, dayEntry.occurrence);

return new Date(year, monthIndex, day);
}
