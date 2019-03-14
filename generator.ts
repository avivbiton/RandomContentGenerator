import { Parser } from "./Parsers/Parser";
import { MinMaxParser } from "./Parsers/MinMaxParser";
import { randomNumber } from "./utils";
import { RandomParser } from "./Parsers/RandomParser";
const availableParsers: Parser[] = [new MinMaxParser(), new RandomParser()];

export class generator {
	schema: any;
	constructor(schema: any) {
		this.schema = schema;
	}

	build(): string {
		let newObject = {};
		for (let i = 0; i < Object.keys(this.schema.fields).length; i++) {
			const name = Object.keys(this.schema.fields)[i];
			const currentField = this.schema.fields[name];

			let currentParser = this.findValidParser(currentField);

			newObject[name] =
				currentParser == null
					? this.getRandomValue(currentField)
					: currentParser.parse();
		}

		return JSON.stringify(newObject);
	}

	private findValidParser(data: Object): Parser {
		let found = null;
		availableParsers.forEach(parser => {
			let clone = parser.clone(data);
			if (clone !== null) {
				found = clone;
			}
		});

		return found;
	}

	private getRandomValue(array): string {
		return array[randomNumber(0, array.length)];
	}
}
