"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = require("./Parser");
var utils_1 = require("../utils");
var MinMaxParser = /** @class */ (function (_super) {
    __extends(MinMaxParser, _super);
    function MinMaxParser() {
        var _this = _super.call(this) || this;
        _this.min = 0;
        _this.max = 1;
        return _this;
    }
    MinMaxParser.prototype.parse = function () {
        return utils_1.randomNumber(this.min, this.max).toString();
    };
    MinMaxParser.prototype.cloneObject = function (dataObject) {
        var newParser = new MinMaxParser();
        newParser.min = dataObject["min"];
        newParser.max = dataObject["max"];
        return newParser;
    };
    return MinMaxParser;
}(Parser_1.Parser));
exports.MinMaxParser = MinMaxParser;
//# sourceMappingURL=MinMaxParser.js.map