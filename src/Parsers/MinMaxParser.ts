import { Parser } from "./Parser";
import { randomNumber } from "../utils";

export class MinMaxParser extends Parser {
	min: number;
	max: number;
	constructor() {
		super();
		this.min = 0;
		this.max = 1;
		this.requiredFields = ["min", "max"];
	}
	parse(): string {
		return randomNumber(this.min, this.max).toString();
	}

	cloneObject(dataObject: object): MinMaxParser {
		let newParser = new MinMaxParser();
		newParser.min = dataObject["min"];
		newParser.max = dataObject["max"];

		return newParser;
	}
}
