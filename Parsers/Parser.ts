import { BasicParser } from "./BasicParser";

export abstract class Parser {
	/*
	To add new parsers, create an object of the type of the parser and add it to the arrary by calling AddParsers
	This will allow to add custom parsers that are not included by this library 
	*/
	private static availableParsers: Parser[] = new Array();

	protected optionalFields: string[];
	protected properties: string[];

	constructor() {
		this.optionalFields = ["properties"];
		this.properties = [];
	}

	abstract parse(): string;

	/**
	 * Create a new instance of a parser if the data object passed down as argument is valid otherwise returns null.
	 * @param dataObject object is used to create the parser
	 */
	clone(dataObject: object): Parser {
		if (this.validateData(dataObject) == false) return null;
		return this.cloneObject(dataObject);
	}

	protected abstract cloneObject(dataObject: object): Parser;

	/**
	 * Validate if an object properties match a parser.
	 * @param data validates the object contains all the data to be used as parser.
	 */
	protected validateData(data: object): boolean {
		const parserKeys = Object.keys(this);
		const dataKeys = Object.keys(data);

		for (let i = 0; i < parserKeys.length; i++) {
			const parserKeyName = parserKeys[i];

			if (this.skipOptionalFields(parserKeyName)) continue;

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
	 *  SKips the optional fields
	 */
	private skipOptionalFields(keyName: string): boolean {
		if (keyName == "optionalFields") return true;
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
			newString.replace(new RegExp(`@{${i}}`, `g`), this.properties[i]);
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
