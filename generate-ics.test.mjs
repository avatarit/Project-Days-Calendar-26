import assert from "node:assert";
import test from "node:test";
import fs from "node:fs";
import path from "node:path";
import { getCommemorativeDate } from "./date-utils.mjs";

const __dirname = path.resolve();
const daysData = JSON.parse(fs.readFileSync(path.join(__dirname, "days.json"), "utf-8"));

const START_YEAR = 2020;
const END_YEAR = 2030;

test("All commemorative dates exist for 2020–2030", () => {
  for (let year = START_YEAR; year <= END_YEAR; year++) {
    for (const dayEntry of daysData) {
      const date = getCommemorativeDate(year, dayEntry);
      assert.ok(date instanceof Date && !isNaN(date), `Invalid date for ${dayEntry.name} in ${year}`);
      const expectedMonth = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ].indexOf(dayEntry.monthName);
      assert.strictEqual(date.getMonth(), expectedMonth, `${dayEntry.name} month mismatch in ${year}`);
    }
  }
});
