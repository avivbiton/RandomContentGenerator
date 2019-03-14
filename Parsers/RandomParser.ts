import { Parser } from "./Parser";
import { randomNumber } from "../utils";

export class RandomParser extends Parser {
	options: Array<Array<string>>;

	constructor() {
		super();
		this.options = new Array();
	}

	parse(): string {
		let parsedString = "";

		// pick one string from each array at random
		for (let i = 0; i < this.options.length; i++) {
			const currentArray = this.options[i];

			parsedString += currentArray[randomNumber(0, currentArray.length)];
		}

		return parsedString;
	}

	protected cloneObject(data: object): RandomParser {
		let newParser = new RandomParser();
		newParser.options = data["options"];

		return newParser;
	}
}
