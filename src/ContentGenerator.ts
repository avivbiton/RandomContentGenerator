import { Parser } from "./Parsers/Parser";

import { InvalidParserException } from "./Exceptions/InvalidParserException";
import { BasicParser } from "./Parsers/BasicParser";
import { MinMaxParser } from "./Parsers/MinMaxParser";
import { MultiPickerParser } from "./Parsers/MultiPickerParser";
import { InvalidSchemaFormatException } from "./Exceptions/InvalidSchemaFormatException";
import { escapeRegExp } from "./utils";

Parser.AddParsers([
	new BasicParser([]),
	new MinMaxParser(),
	new MultiPickerParser()
]);

export class ContentGenerator {
	schema: object;
	globalProperties: Array<string>;
	constructor(schema: object) {
		this.schema = schema;
		this.globalProperties = new Array<string>();
	}

	build(): string {
		this.throwIfInvalidSchema();
		this.parseGlobalProperties();

		let newObject = {};
		let schemaFields = Object.keys(this.schema["fields"]);
		for (let i = 0; i < schemaFields.length; i++) {
			const fieldName = schemaFields[i];
			const fieldObject = this.schema["fields"][fieldName];

			let currentParser = this.findParser(fieldObject);
			let parsedText = currentParser.parse();
			parsedText = this.applyGlobalProperties(parsedText);
			newObject[fieldName] = parsedText;
		}
		return JSON.stringify(newObject);
	}


	/**
	 * Validate all the required properties are present and in the correct type. Throw an error otherwise.
	 * @param schema JSON schema 
	 */
	private throwIfInvalidSchema(schema?: object) {

		let schemaToCheck = schema ? schema : this.schema;

		const requiredProperties = [{ name: "fields", type: "object" }];

		for (let i = 0; i < requiredProperties.length; i++) {
			const required = requiredProperties[i];
			if (schemaToCheck.hasOwnProperty(required.name) == false ||
				typeof schemaToCheck[required.name] !== required.type) {
				throw new InvalidSchemaFormatException(`Schema format is missing a required field: "${required.name}" of type: "${required.type}"`);
			}
		}
	}


	/**
	 * finds the first matching parser for the data object. throws an error If it could not find one.
	 * @param dataObject data object used to apply data to the parser
	 */
	private findParser(dataObject: object): Parser {
		let currentParser = Parser.GetValidParser(dataObject);
		if (currentParser == null) throw new InvalidParserException(dataObject);

		return currentParser;
	}

	/**
	 * Parse each global property and save it into the array to ensure the result are consistent
	 */
	private parseGlobalProperties() {
		if (this.schema.hasOwnProperty("globalProperties") == false) return;

		let properties = this.schema["globalProperties"];

		if (Array.isArray(properties) == false)
			throw new InvalidSchemaFormatException("global Properties must be an array.");

		this.globalProperties = new Array<string>();
		for (let i = 0; i < properties.length; i++) {
			let parser = this.findParser(properties[i]);
			this.globalProperties.push(parser.parse());
		}

	}

	private applyGlobalProperties(text: string): string {
		let newString = text;;
		for (let i = 0; i < this.globalProperties.length; i++) {
			newString = newString.replace(
				new RegExp(escapeRegExp(`@g{${i}}`), `g`),
				this.globalProperties[i]
			);
		}
		return newString;
	}
}
