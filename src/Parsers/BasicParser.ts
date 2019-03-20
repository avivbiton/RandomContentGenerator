import { Parser } from "./Parser";
import { randomNumber } from "../utils";

export class BasicParser extends Parser {
	text: string[];

	constructor(text: string[]) {
		super();
		this.text = text;
	}

	parse(): string {
		let selectedText = this.text[randomNumber(0, this.text.length)];

		return this.parseProperties(selectedText);
	}

	protected isDataValid(data: object): boolean {
		if (Array.isArray(data) || typeof data === "string") return true;
		if (typeof data === "object") {
			return super.isDataValid(data);
		}
		return false;
	}

	protected cloneObject(dataObject: any): Parser {
		if (Array.isArray(dataObject)) return new BasicParser(dataObject);
		if (typeof dataObject === "string") return new BasicParser([dataObject]);
		return new BasicParser(dataObject["text"]);
	}
}
