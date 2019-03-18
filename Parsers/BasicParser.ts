import { Parser } from "./Parser";
import { randomNumber } from "../utils";

export class BasicParser extends Parser {
	text: string[];

	constructor(text: string[]) {
		super();
		this.text = text;
	}

	parse(): string {
		return this.text[randomNumber(0, this.text.length)];
	}

	protected cloneObject(dataObject: object): Parser {
		return new BasicParser(dataObject["text"]);
	}
}
