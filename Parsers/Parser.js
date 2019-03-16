"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicParser_1 = require("./BasicParser");
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.prototype.clone = function (dataObject) {
        if (this.validateData(dataObject) == false)
            return null;
        return this.cloneObject(dataObject);
    };
    Parser.prototype.validateData = function (data) {
        var parserKeys = Object.keys(this);
        var dataKeys = Object.keys(data);
        for (var i = 0; i < parserKeys.length; i++) {
            var parserKeyName = parserKeys[i];
            if (typeof this[parserKeyName] === "function")
                continue;
            var index = dataKeys.indexOf(parserKeyName);
            if (index == -1 ||
                typeof data[dataKeys[index]] !== typeof this[parserKeyName])
                return false;
        }
        return true;
    };
    Parser.AddParsers = function (array) {
        this.availableParsers = this.availableParsers.concat(array);
    };
    Parser.GetValidParser = function (data) {
        if (Array.isArray(data))
            return new BasicParser_1.BasicParser(data);
        var found = null;
        this.availableParsers.forEach(function (parser) {
            var clone = parser.clone(data);
            if (clone !== null) {
                found = clone;
                return;
            }
        });
        return found;
    };
    Parser.availableParsers = new Array();
    return Parser;
}());
exports.Parser = Parser;
