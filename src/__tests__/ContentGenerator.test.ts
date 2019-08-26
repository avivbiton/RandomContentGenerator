import { ContentGenerator } from "../ContentGenerator";
import { InvalidParserException } from "../Exceptions/InvalidParserException";
import { InvalidSchemaFormatException } from "../Exceptions/InvalidSchemaFormatException";

import mockSchema from "./mockData/mockSchema.json";
import { Schema } from '../Schema';
import { Field } from '../Field';

test("generated content is not empty", () => {
	let json = mockSchema;
	let content = new ContentGenerator(json);
	let build = content.build();

	console.log(JSON.stringify(build));

	expect(Object.keys(build).length).toBeGreaterThan(0);

});

test("build throws InvalidParserException when parser is invalid", () => {
	function buildContent() {

		let schema = new Schema([
			new Field("name", { invalid: "showthrow" })
		], []);

		let content = new ContentGenerator(schema);
		content.build();
	};

	expect(buildContent).toThrowError(InvalidParserException);
});

test("build throws InvalidSchemaFormatException when schema is null", () => {
	function buildWithInvalidSchema() {
		let content = new ContentGenerator(null);
		content.build();
	}

	expect(buildWithInvalidSchema).toThrowError(InvalidSchemaFormatException);
});
