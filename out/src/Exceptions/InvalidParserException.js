"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InvalidParserException = /** @class */ (function () {
    function InvalidParserException(dataObject, information) {
        if (information === void 0) { information = ""; }
        this.message =
            "Parser is invalid or null due to invalid data object or schema. (No available parsers found compatible with the given data object)";
        this.dataObject = dataObject;
        this.information = information;
    }
    InvalidParserException.prototype.toString = function () {
        return this.message + "\n " + JSON.stringify(this.dataObject);
    };
    return InvalidParserException;
}());
exports.InvalidParserException = InvalidParserException;
//# sourceMappingURL=InvalidParserException.js.map