"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = require("./Parsers/Parser");
var InvalidParserException_1 = require("./Exceptions/InvalidParserException");
var BasicParser_1 = require("./Parsers/BasicParser");
var MinMaxParser_1 = require("./Parsers/MinMaxParser");
var MultiPickerParser_1 = require("./Parsers/MultiPickerParser");
var InvalidSchemaFormatException_1 = require("./Exceptions/InvalidSchemaFormatException");
var utils_1 = require("./utils");
Parser_1.Parser.AddParsers([
    new BasicParser_1.BasicParser([]),
    new MinMaxParser_1.MinMaxParser(),
    new MultiPickerParser_1.MultiPickerParser()
]);
var ContentGenerator = /** @class */ (function () {
    function ContentGenerator(schema) {
        this.schema = schema;
        this.globalProperties = new Array();
    }
    ContentGenerator.prototype.build = function () {
        this.throwIfInvalidSchema();
        this.parseGlobalProperties();
        var newObject = {};
        var schemaFields = Object.keys(this.schema["fields"]);
        for (var i = 0; i < schemaFields.length; i++) {
            var fieldName = schemaFields[i];
            var fieldObject = this.schema["fields"][fieldName];
            var currentParser = this.findParser(fieldObject);
            var parsedText = currentParser.parse();
            parsedText = this.applyGlobalProperties(parsedText);
            newObject[fieldName] = parsedText;
        }
        return JSON.stringify(newObject);
    };
    /**
     * Validate all the required properties are present and in the correct type. Throw an error otherwise.
     * @param schema JSON schema
     */
    ContentGenerator.prototype.throwIfInvalidSchema = function (schema) {
        var schemaToCheck = schema ? schema : this.schema;
        var requiredProperties = [{ name: "fields", type: "object" }];
        for (var i = 0; i < requiredProperties.length; i++) {
            var required = requiredProperties[i];
            if (schemaToCheck.hasOwnProperty(required.name) == false ||
                typeof schemaToCheck[required.name] !== required.type) {
                throw new InvalidSchemaFormatException_1.InvalidSchemaFormatException("Schema format is missing a required field: \"" + required.name + "\" of type: \"" + required.type + "\"");
            }
        }
    };
    /**
     * finds the first matching parser for the data object. throws an error If it could not find one.
     * @param dataObject data object used to apply data to the parser
     */
    ContentGenerator.prototype.findParser = function (dataObject) {
        var currentParser = Parser_1.Parser.GetValidParser(dataObject);
        if (currentParser == null)
            throw new InvalidParserException_1.InvalidParserException(dataObject);
        return currentParser;
    };
    /**
     * Parse each global property and save it into the array to ensure the result are consistent
     */
    ContentGenerator.prototype.parseGlobalProperties = function () {
        if (this.schema.hasOwnProperty("globalProperties") == false)
            return;
        var properties = this.schema["globalProperties"];
        if (Array.isArray(properties) == false)
            throw new InvalidSchemaFormatException_1.InvalidSchemaFormatException("global Properties must be an array.");
        this.globalProperties = new Array();
        for (var i = 0; i < properties.length; i++) {
            var parser = this.findParser(properties[i]);
            this.globalProperties.push(parser.parse());
        }
    };
    ContentGenerator.prototype.applyGlobalProperties = function (text) {
        var newString = text;
        ;
        for (var i = 0; i < this.globalProperties.length; i++) {
            newString = newString.replace(new RegExp(utils_1.escapeRegExp("@g{" + i + "}"), "g"), this.globalProperties[i]);
        }
        return newString;
    };
    return ContentGenerator;
}());
exports.ContentGenerator = ContentGenerator;
//# sourceMappingURL=ContentGenerator.js.map