"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContentGenerator_1 = require("../ContentGenerator");
var InvalidParserException_1 = require("../Exceptions/InvalidParserException");
test("build throws InvalidParserException when parser is null", function () {
    function buildContent() {
        var schema = {
            fields: {
                invalid: {
                    someinvalidproperty: "should throw"
                }
            }
        };
        var content = new ContentGenerator_1.ContentGenerator(schema);
        content.build();
    }
    expect(buildContent).toThrowError(InvalidParserException_1.InvalidParserException);
});
//# sourceMappingURL=ContentGenerator.test.js.map