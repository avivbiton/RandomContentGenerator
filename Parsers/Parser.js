"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                typeof data[dataKeys[i]] !== typeof this[parserKeyName])
                return false;
        }
        return true;
    };
    return Parser;
}());
exports.Parser = Parser;
