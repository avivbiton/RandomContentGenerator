import { ContentGenerator } from "../ContentGenerator";
import { InvalidParserException } from "../Exceptions/InvalidParserException";
import { InvalidSchemaFormatException } from "../Exceptions/InvalidSchemaFormatException";

import mockSchema from "./mockData/mockSchema.json";

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

test("generated content is not empty", () => {
	let json = mockSchema;
	let content = new ContentGenerator(json);
	let build = content.build();

	console.log(build);

	expect(Object.keys(build).length).toBeGreaterThan(0);

});