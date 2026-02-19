import assert from "node:assert";
import test from "node:test";
import fs from "fs";
import path from "path";

import { getCommemorativeDate } from "./date-utils.mjs";

// Read days.json
const __dirname = path.resolve();
const daysData = JSON.parse(fs.readFileSync(path.join(__dirname, "days.json"), "utf-8"));

// Test Ada Lovelace Day
test("Ada Lovelace Day 2024 is Oct 8 (UTC)", () => {
    const ada = getCommemorativeDate(2024, daysData[0]);
    assert.strictEqual(ada.getUTCFullYear(), 2024);
    assert.strictEqual(ada.getUTCMonth(), 9);
    assert.strictEqual(ada.getUTCDate(), 8);
  });


test("World Lemur Day 2024 is Oct 25 (UTC)", () => {
    const lemur = getCommemorativeDate(2024, daysData[4]);
    assert.strictEqual(lemur.getUTCFullYear(), 2024);
    assert.strictEqual(lemur.getUTCMonth(), 9);
    assert.strictEqual(lemur.getUTCDate(), 25);
  });
>>>>>>> 3d48280ef785f509c763afc9e650076a18050b73
