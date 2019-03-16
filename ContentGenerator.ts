import {
	BasicParser,
	MinMaxParser,
	MultiPickerParser
} from "./Parsers/availableParsers";

import { Parser } from "./Parsers/Parser";

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
			if (currentParser == null) {
				throw `Unable to find a valid parser. JSON format may be invalid. \nObject: ${fieldObject}`;
			}

			newObject[fieldName] = currentParser.parse();
		}
		return JSON.stringify(newObject);
	}
}
