import { Parser } from "./Parsers/Parser";
import { Schema } from './Schema';
import { InvalidParserException } from "./Exceptions/InvalidParserException";
import { BasicParser } from "./Parsers/BasicParser";
import { MinMaxParser } from "./Parsers/MinMaxParser";
import { MultiPickerParser } from "./Parsers/MultiPickerParser";
import { InvalidSchemaFormatException } from "./Exceptions/InvalidSchemaFormatException";
import { escapeRegExp } from "./utils";

Parser.AddParsers([
	new BasicParser(),
	new MinMaxParser(),
	new MultiPickerParser()
]);

export class ContentGenerator {
	schema: Schema;
	globalPropertiesParsed: Array<string>;

	constructor(schema: Schema) {
		this.schema = schema;
		this.globalPropertiesParsed = new Array<string>();
	}

	build(): object {
		this.throwIfInvalidSchema();
		this.parseGlobalProperties();

		let newObject = {};
		let schemaFields = this.schema.fields;
		for (let i = 0; i < schemaFields.length; i++) {
			const fieldName = this.schema.fields[i].name;
			const fieldObject = this.schema.fields[i].data;

			let currentParser = ContentGenerator.findParser(fieldObject);
			let parsedText = currentParser.parse();
			parsedText = this.applyGlobalProperties(parsedText);
			newObject[fieldName] = parsedText;
		}
		return newObject;
	}

	/**
	 * Returns true if the schema is valid or an error object.
	 * This will just call build() and returns the first error it picks on the way.
	 */
	isValid(): Boolean | object {
		try {
			this.build();
			return true;
		} catch (error) {
			return error;
		}
	}

	setSchema(newSchema: Schema): void {
		this.schema = newSchema;
	}


	/**
	 * Returns the parser for the given data Object or null if nothing matches
	 */
	public static getParser(dataObject: object): object | null {
		try {
			return ContentGenerator.findParser(dataObject);
		} catch (error) {
			return null;
		}
	}

	/**
	 * Validate all the required properties are present and in the correct type. Throw an error otherwise.
	 * @param schema JSON schema 
	 */
	private throwIfInvalidSchema(schema?: Schema) {

		let schemaToCheck = schema ? schema : this.schema;
		if (schemaToCheck == null || schemaToCheck.hasOwnProperty("fields") === false ||
			Array.isArray(schemaToCheck.fields) === false) {
			throw new InvalidSchemaFormatException("Schema must contains fields property of type Array");
		}
	}


	/**
	 * finds the first matching parser for the data object. throws an error If it could not find one.
	 * @param dataObject data object used to apply data to the parser
	 */
	private static findParser(dataObject: object): Parser {
		let currentParser = Parser.GetValidParser(dataObject);
		if (currentParser == null) throw new InvalidParserException(dataObject);

		return currentParser;
	}

	/**
	 * Parse each global property and save it into the array to ensure the result are consistent
	 */
	private parseGlobalProperties() {

		if (this.schema.hasOwnProperty("globalProperties") === false) return;

		let properties = this.schema.globalProperties;

		if (Array.isArray(properties) == false)
			throw new InvalidSchemaFormatException("global Properties must be an array.");

		this.globalPropertiesParsed = new Array<string>();
		for (let i = 0; i < properties.length; i++) {
			let parser = ContentGenerator.findParser(properties[i]);
			this.globalPropertiesParsed.push(parser.parse());
		}

	}

	/**
	 * replaces all instance in the text with the appropriate global properties.
	 * @param text the text that will be replaced
	 */
	private applyGlobalProperties(text: string): string {
		let newString = text;;
		for (let i = 0; i < this.globalPropertiesParsed.length; i++) {
			newString = newString.replace(
				new RegExp(escapeRegExp(`@g{${i}}`), `g`),
				this.globalPropertiesParsed[i]
			);
		}
		return newString;
	}
}
