"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InvalidSchemaFormatException = /** @class */ (function () {
    function InvalidSchemaFormatException(message) {
        if (typeof message === "undefined") {
            this.message = "Schema has invalid format.";
        }
        else {
            this.message = message;
        }
    }
    InvalidSchemaFormatException.prototype.toString = function () {
        return this.message;
    };
    return InvalidSchemaFormatException;
}());
exports.InvalidSchemaFormatException = InvalidSchemaFormatException;
//# sourceMappingURL=InvalidSchemaFormatException.js.map