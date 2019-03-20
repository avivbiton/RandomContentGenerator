"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../utils");

test("randomNumber - max random number is exclusive", function () {
  expect(utils_1.randomNumber(0, 1)).toBe(0);
});
test("randomNumber - number is not higher than min", function () {
  expect(utils_1.randomNumber(1, 2)).not.toBeGreaterThan(1);
});