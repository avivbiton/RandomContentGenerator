"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicParser_1 = require("./BasicParser");
var utils_1 = require("../utils");
var InvalidParserException_1 = require("../Exceptions/InvalidParserException");
var Parser = /** @class */ (function () {
    function Parser() {
        this.optionalFields = ["optionalFields", "properties"];
        this.properties = [];
    }
    /**
     * Create a new instance of a parser if the data object passed down as argument is valid otherwise returns null.
     * @param dataObject object is used to create the parser
     */
    Parser.prototype.clone = function (dataObject) {
        if (this.isDataValid(dataObject) == false)
            return null;
        var clone = this.cloneObject(dataObject);
        if (dataObject.hasOwnProperty("properties")) {
            clone.properties = dataObject["properties"];
        }
        return clone;
    };
    /**
     * Validate if an object properties match a parser.
     * @param data validates the object contains all the data to be used as parser.
     */
    Parser.prototype.isDataValid = function (data) {
        var parserKeys = Object.keys(this);
        var dataKeys = Object.keys(data);
        for (var i = 0; i < parserKeys.length; i++) {
            var parserKeyName = parserKeys[i];
            if (this.isOptionalField(parserKeyName))
                continue;
            var index = dataKeys.indexOf(parserKeyName);
            if (index == -1 ||
                typeof data[dataKeys[index]] !== typeof this[parserKeyName])
                return false;
        }
        return true;
    };
    /**
     * checks if a property name is present in the optional properties array for the parser.
     * @param keyName the name of the property
     */
    Parser.prototype.isOptionalField = function (keyName) {
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
            var parser = Parser.GetValidParser(this.properties[i]);
            if (parser == null)
                throw new InvalidParserException_1.InvalidParserException(this.properties[i]);
            newString = newString.replace(new RegExp(utils_1.escapeRegExp("@{" + i + "}"), "g"), parser.parse());
        }
        return newString;
    };
    /**
     * Add parsers to the availableParsers property.
     * @param array an array of parsers to be added to the availableParsers pool.
     */
    Parser.AddParsers = function (array) {
        if (array.some(function (i) { return i === null || typeof i === "undefined"; }))
            throw new TypeError("Can not add null or undefined parsers.");
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
    Parsers accepts a data object and creates a returns a string based on the object and the type of parser
    To add new parsers, create a new type that extend the parser class and add an instance of it to the arrary by calling AddParsers.
    */
    Parser.availableParsers = new Array();
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map