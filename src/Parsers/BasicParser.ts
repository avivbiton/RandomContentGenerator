import { Parser } from "./Parser";
import { randomNumber } from "../utils";

export class BasicParser extends Parser {
	text: string[];

	constructor() {
		super();
		this.text = [];
		this.requiredFields = ["text"];
	}

	parse(): string {
		let selectedText = this.text[randomNumber(0, this.text.length)];

		return this.parseProperties(selectedText);
	}
	getName() {
		return "Basic Picker";
	}

	public isDataValid(data: any): boolean {
		if ((Array.isArray(data) && data.length !== 0 && data.every(i => typeof i === "string"))
			|| typeof data === "string") return true;

		if (typeof data === "object") {
			return super.isDataValid(data);
		}
		return false;
	}

	protected cloneObject(dataObject: any): Parser {
		let parser = new BasicParser();

		if (Array.isArray(dataObject)) {
			parser.text = dataObject;
		}
		else if (typeof dataObject === "string") {
			parser.text = [dataObject];
		} else {
			parser.text = dataObject["text"];
		}

		return parser;
	}
}
