"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.randomNumber = randomNumber;
