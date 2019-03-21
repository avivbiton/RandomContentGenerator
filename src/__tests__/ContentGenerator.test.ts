import { ContentGenerator } from "../ContentGenerator";
import { InvalidParserException } from "../Exceptions/InvalidParserException";
import { InvalidSchemaFormatException } from "../Exceptions/InvalidSchemaFormatException";

test("build throws InvalidParserException when parser is null", () => {
	function buildContent() {
		let schema = {
			fields: {
				invalid: {
					someinvalidproperty: "should throw"
				}
			}
		};
		let content = new ContentGenerator(schema);
		content.build();
	}

	expect(buildContent).toThrowError(InvalidParserException);
});

test("build throws InvalidSchemaException when schema is invalid", () => {
	function buildWithInvalidSchema() {
		let schema = {};
		let content = new ContentGenerator(schema);
		content.build();
	}

	expect(buildWithInvalidSchema).toThrowError(InvalidSchemaFormatException);
});
