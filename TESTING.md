# TESTING.md

## How we tested the Web Calendar

- We opened the site in the browser using a local HTTP server (because ES modules don’t work with `file://`).
- We checked that the calendar loads the current month on page load.
- We clicked **Previous** and **Next** repeatedly to confirm navigation works across year boundaries (e.g. Dec → Jan and Jan → Dec).
- We used the **Month** and **Year** dropdowns to jump directly to specific dates (for example: October 2024, September 2024, May 2024).
- We verified the calendar grid layout:
  - The first day of the month appears under the correct weekday.
  - The correct number of days is shown for each month (including February).
- We verified commemorative days from `days.json` appear in the correct month and on the correct day, and that multiple events on the same day are displayed as multiple labels in the same calendar cell.

### Manual date checks (examples)
- October 2024:
  - Ada Lovelace Day (second Tuesday) appears on **8 Oct 2024**
  - World Lemur Day (last Friday) appears on **25 Oct 2024**
- September 2024:
  - International Vulture Awareness Day (first Saturday) appears on **7 Sep 2024**
  - International Red Panda Day (third Saturday) appears on **21 Sep 2024**
- May 2024:
  - International Binturong Day (second Saturday) appears on **11 May 2024**


## How we tested the date logic (unit tests)

- We ran unit tests using Node’s built-in test runner.
- We tested that `getCommemorativeDate` returns the expected date for known examples from `days.json` (including “second” and “last” occurrences).
- We also tested that dates are generated for every entry in `days.json` across the full range of years (2020–2030) and that each generated date is a valid `Date`.

Commands used:
- `node --test`


## How we tested the ICS file generation

- We ran the script that generates the calendar file for 2020–2030.
- We checked that the output file is created successfully and contains valid VCALENDAR/VEVENT blocks.
- We imported the generated `.ics` file into Google Calendar to confirm:
  - Events appear on the correct dates.
  - Events are treated as all-day events.

Commands used:
- `node generate-ical.mjs`

## Additional rubric checks

- We confirmed the calendar works for years beyond the dropdown range by navigating with Previous/Next (e.g. 1900 and 2050).
- We verified the grid includes empty cells after the final day of the month so weeks are complete.
- We confirmed the ICS generator and web UI both import and use the same shared date logic module.
- We ran Lighthouse in Chrome and achieved an Accessibility score of 100.


## Known limitations / notes

- The project is based on date-only events (not specific times). We keep the date calculations consistent to avoid daylight-saving/timezone edge cases as much as possible.
