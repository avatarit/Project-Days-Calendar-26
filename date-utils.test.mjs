import assert from "node:assert";
import test from "node:test";
import fs from "fs";
import path from "path";

import { getCommemorativeDate } from "./date-utils.mjs";

const __dirname = path.resolve();
const daysData = JSON.parse(fs.readFileSync(path.join(__dirname, "days.json"), "utf-8"));

test("Ada Lovelace Day 2024 is correct", () => {
    const adaDay = getCommemorativeDate(daysData[0], 2024);
    assert.equal(adaDay.toDateString(), "Tue Oct 08 2024");
});

test("World Lemur Day 2024 is correct", () => {
    const lemurDay = getCommemorativeDate(daysData[4], 2024);
    assert.equal(lemurDay.toDateString(), "Fri Oct 25 2024");
});
