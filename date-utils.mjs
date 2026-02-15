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

