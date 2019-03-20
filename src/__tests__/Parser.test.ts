import { Parser } from "../Parsers/Parser";

test("AddParsers should throw when adding null or undefined", () => {
	function nullInsert() {
		Parser.AddParsers([null]);
	}
	function undefinedInsert() {
		Parser.AddParsers([undefined]);
	}

	expect(nullInsert).toThrowError(TypeError);
	expect(undefinedInsert).toThrowError(TypeError);
});
