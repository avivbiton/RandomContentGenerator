"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MinMaxParser_1 = require("./Parsers/MinMaxParser");
var utils_1 = require("./utils");
var RandomParser_1 = require("./Parsers/RandomParser");
var availableParsers = [new MinMaxParser_1.MinMaxParser(), new RandomParser_1.RandomParser()];
var generator = /** @class */ (function () {
    function generator(schema) {
        this.schema = schema;
    }
    generator.prototype.build = function () {
        var newObject = {};
        for (var i = 0; i < Object.keys(this.schema.fields).length; i++) {
            var name_1 = Object.keys(this.schema.fields)[i];
            var currentField = this.schema.fields[name_1];
            var currentParser = this.findValidParser(currentField);
            newObject[name_1] =
                currentParser == null
                    ? this.getRandomValue(currentField)
                    : currentParser.parse();
        }
        return JSON.stringify(newObject);
    };
    generator.prototype.findValidParser = function (data) {
        var found = null;
        availableParsers.forEach(function (parser) {
            var clone = parser.clone(data);
            if (clone !== null) {
                found = clone;
            }
        });
        return found;
    };
    generator.prototype.getRandomValue = function (array) {
        return array[utils_1.randomNumber(0, array.length)];
    };
    return generator;
}());
exports.generator = generator;
