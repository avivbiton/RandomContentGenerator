import { BasicParser } from "./BasicParser";

export abstract class Parser {
	private static availableParsers: Parser[] = new Array();
	constructor() {}

	abstract parse(): string;

	clone(dataObject: object): Parser {
		if (this.validateData(dataObject) == false) return null;
		return this.cloneObject(dataObject);
	}
	protected abstract cloneObject(dataObject: object): Parser;

	protected validateData(data: object): boolean {
		const parserKeys = Object.keys(this);
		const dataKeys = Object.keys(data);
		for (let i = 0; i < parserKeys.length; i++) {
			const parserKeyName = parserKeys[i];
			if (typeof this[parserKeyName] === "function") continue;
			const index = dataKeys.indexOf(parserKeyName);

			if (
				index == -1 ||
				typeof data[dataKeys[index]] !== typeof this[parserKeyName]
			)
				return false;
		}
		return true;
	}

	public static AddParsers(array: Parser[]) {
		this.availableParsers = this.availableParsers.concat(array);
	}

	public static GetValidParser(data: any): Parser {
		if (Array.isArray(data)) return new BasicParser(data);

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
