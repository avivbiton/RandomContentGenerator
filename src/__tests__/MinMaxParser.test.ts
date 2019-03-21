import { MinMaxParser } from "../Parsers/MinMaxParser";

test("parse() should return a string that can be parsed into a number", () => {
	let minmax = new MinMaxParser();
	let value = minmax.parse();
	expect(isNaN(parseInt(value))).toBeFalsy();
});
