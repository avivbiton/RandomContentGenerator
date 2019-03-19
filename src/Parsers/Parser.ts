import { BasicParser } from "./BasicParser";
import { escapeRegExp } from "../utils";
import { InvalidParserException } from "../Exceptions/InvalidParserException";

export abstract class Parser {
	/*
	Parsers accepts a data object and creates a returns a string based on the object and the type of parser
	To add new parsers, create a new type that extend the parser class and add an instance of it to the arrary by calling AddParsers.	
	*/
	private static availableParsers: Parser[] = new Array();

	protected readonly optionalFields: string[];
	protected properties: any[];

	constructor() {
		this.optionalFields = ["optionalFields", "properties"];
		this.properties = [];
	}

	abstract parse(): string;

	/**
	 * Create a new instance of a parser if the data object passed down as argument is valid otherwise returns null.
	 * @param dataObject object is used to create the parser
	 */
	clone(dataObject: object): Parser {
		if (this.isDataValid(dataObject) == false) return null;

		let clone = this.cloneObject(dataObject);

		if (dataObject.hasOwnProperty("properties")) {
			clone.properties = dataObject["properties"];
		}
		return clone;
	}

	protected abstract cloneObject(dataObject: object): Parser;

	/**
	 * Validate if an object properties match a parser.
	 * @param data validates the object contains all the data to be used as parser.
	 */
	protected isDataValid(data: object): boolean {
		const parserKeys = Object.keys(this);
		const dataKeys = Object.keys(data);

		for (let i = 0; i < parserKeys.length; i++) {
			const parserKeyName = parserKeys[i];

			if (this.isOptionalField(parserKeyName)) continue;

			const index = dataKeys.indexOf(parserKeyName);

			if (
				index == -1 ||
				typeof data[dataKeys[index]] !== typeof this[parserKeyName]
			)
				return false;
		}
		return true;
	}

	/**
	 * checks if a property name is present in the optional properties array for the parser.
	 * @param keyName the name of the property
	 */
	private isOptionalField(keyName: string): boolean {
		if (typeof this[keyName] === "function") return true;
		if (this.optionalFields.indexOf(keyName) != -1) return true;

		return false;
	}

	/**
	 * Parses a text based on the properties the parser has.
	 * @param text the text that will be parsed.
	 * @returns returns the parsed text
	 */
	protected parseProperties(text: string): string {
		let newString = text;
		for (let i = 0; i < this.properties.length; i++) {
			let parser = Parser.GetValidParser(this.properties[i]);
			if (parser == null) throw new InvalidParserException(this.properties[i]);
			newString = newString.replace(
				new RegExp(escapeRegExp(`@{${i}}`), `g`),
				parser.parse()
			);
		}

		return newString;
	}

	/**
	 * Add parsers to the availableParsers property.
	 * @param array an array of parsers to be added to the availableParsers pool.
	 */
	public static AddParsers(array: Parser[]) {
		this.availableParsers = this.availableParsers.concat(array);
	}

	/**
	 * Loop through the available parsers and find the first matching parser, returns null if not found.
	 * @param data the object to search a parser for.
	 * @returns A parser if found, otherwise returns null.
	 */
	public static GetValidParser(data: any): Parser {
		if (Array.isArray(data)) return new BasicParser(data);
		if (typeof data === "string") return new BasicParser([data]);

		let found = null;
		this.availableParsers.forEach(parser => {
			let clone = parser.clone(data);
			if (clone !== null) {
				found = clone;

				return;
			}
		});

		return found;
	}
}
