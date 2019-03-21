import { Parser } from "./Parsers/Parser";

import { InvalidParserException } from "./Exceptions/InvalidParserException";
import { BasicParser } from "./Parsers/BasicParser";
import { MinMaxParser } from "./Parsers/MinMaxParser";
import { MultiPickerParser } from "./Parsers/MultiPickerParser";
import { InvalidSchemaFormatException } from "./Exceptions/InvalidSchemaFormatException";

Parser.AddParsers([
	new BasicParser([]),
	new MinMaxParser(),
	new MultiPickerParser()
]);

export class ContentGenerator {
	schema: object;
	constructor(schema: object) {
		this.schema = schema;
	}

	build(): string {
		this.throwIfInvalidSchema();

		let newObject = {};
		let schemaFields = Object.keys(this.schema["fields"]);
		for (let i = 0; i < schemaFields.length; i++) {
			const fieldName = schemaFields[i];
			const fieldObject = this.schema["fields"][fieldName];

			let currentParser = Parser.GetValidParser(fieldObject);
			if (currentParser == null) throw new InvalidParserException(fieldObject);

			newObject[fieldName] = currentParser.parse();
		}
		return JSON.stringify(newObject);
	}

	throwIfInvalidSchema(schema?: object) {
		let schemaToCheck = this.schema;
		if (typeof schema !== "undefined") {
			schemaToCheck = schema;
		}

		const requiredProperties = ["fields"];

		for (let i = 0; i < requiredProperties.length; i++) {
			if (schemaToCheck.hasOwnProperty(requiredProperties[i]) == false) {
				throw new InvalidSchemaFormatException(
					`Schema format is invalid./n${
						requiredProperties[i]
					} property is required.`
				);
			}
		}
	}
}
