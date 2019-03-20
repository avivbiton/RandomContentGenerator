import { Parser } from "./Parsers/Parser";

import { InvalidParserException } from "./Exceptions/InvalidParserException";
import { BasicParser } from "./Parsers/BasicParser";
import { MinMaxParser } from "./Parsers/MinMaxParser";
import { MultiPickerParser } from "./Parsers/MultiPickerParser";

Parser.AddParsers([
	new BasicParser([]),
	new MinMaxParser(),
	new MultiPickerParser()
]);

export class ContentGenerator {
	schema: any;
	constructor(schema: any) {
		this.schema = schema;
	}

	build(): string {
		let newObject = {};
		let schemaFields = Object.keys(this.schema.fields);
		for (let i = 0; i < schemaFields.length; i++) {
			const fieldName = schemaFields[i];
			const fieldObject = this.schema.fields[fieldName];

			let currentParser = Parser.GetValidParser(fieldObject);
			if (currentParser == null) throw new InvalidParserException(fieldObject);

			newObject[fieldName] = currentParser.parse();
		}
		return JSON.stringify(newObject);
	}
}
