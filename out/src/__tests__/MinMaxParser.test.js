"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MinMaxParser_1 = require("../Parsers/MinMaxParser");
test("parse() should return a string that can be parsed into a number", function () {
    var minmax = new MinMaxParser_1.MinMaxParser();
    var value = minmax.parse();
    expect(isNaN(parseInt(value))).toBeFalsy();
});
//# sourceMappingURL=MinMaxParser.test.js.map