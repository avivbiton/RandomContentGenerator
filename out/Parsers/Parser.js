"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicParser_1 = require("./BasicParser");
var Parser = /** @class */ (function () {
    function Parser() {
        this.optionalFields = ["properties"];
        this.properties = [];
    }
    /**
     * Create a new instance of a parser if the data object passed down as argument is valid otherwise returns null.
     * @param dataObject object is used to create the parser
     */
    Parser.prototype.clone = function (dataObject) {
        if (this.validateData(dataObject) == false)
            return null;
        return this.cloneObject(dataObject);
    };
    /**
     * Validate if an object properties match a parser.
     * @param data validates the object contains all the data to be used as parser.
     */
    Parser.prototype.validateData = function (data) {
        var parserKeys = Object.keys(this);
        var dataKeys = Object.keys(data);
        for (var i = 0; i < parserKeys.length; i++) {
            var parserKeyName = parserKeys[i];
            if (this.skipOptionalFields(parserKeyName))
                continue;
            var index = dataKeys.indexOf(parserKeyName);
            if (index == -1 ||
                typeof data[dataKeys[index]] !== typeof this[parserKeyName])
                return false;
        }
        return true;
    };
    /**
     *  SKips the optional fields
     */
    Parser.prototype.skipOptionalFields = function (keyName) {
        if (keyName == "optionalFields")
            return true;
        if (typeof this[keyName] === "function")
            return true;
        if (this.optionalFields.indexOf(keyName) != -1)
            return true;
        return false;
    };
    /**
     * Parses a text based on the properties the parser has.
     * @param text the text that will be parsed.
     * @returns returns the parsed text
     */
    Parser.prototype.parseProperties = function (text) {
        var newString = text;
        for (var i = 0; i < this.properties.length; i++) {
            newString.replace(new RegExp("@{" + i + "}", "g"), this.properties[i]);
        }
        return newString;
    };
    /**
     * Add parsers to the availableParsers property.
     * @param array an array of parsers to be added to the availableParsers pool.
     */
    Parser.AddParsers = function (array) {
        this.availableParsers = this.availableParsers.concat(array);
    };
    /**
     * Loop through the available parsers and find the first matching parser, returns null if not found.
     * @param data the object to search a parser for.
     * @returns A parser if found, otherwise returns null.
     */
    Parser.GetValidParser = function (data) {
        if (Array.isArray(data))
            return new BasicParser_1.BasicParser(data);
        if (typeof data === "string")
            return new BasicParser_1.BasicParser([data]);
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
    /*
    To add new parsers, create an object of the type of the parser and add it to the arrary by calling AddParsers
    This will allow to add custom parsers that are not included by this library
    */
    Parser.availableParsers = new Array();
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map