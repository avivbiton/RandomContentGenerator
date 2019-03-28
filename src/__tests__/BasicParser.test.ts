import { BasicParser } from "../Parsers/BasicParser";

test("Can accept a string as data", () => {

    let parser = new BasicParser();
    expect(parser.isDataValid("a string")).toBeTruthy();
});

test("Can accept an array of string as data", () => {

    let parser = new BasicParser();
    expect(parser.isDataValid(["an array of strings"])).toBeTruthy();
});

test("Shoud not accept an array that is not type of string", () => {

    let parser = new BasicParser();
    expect(parser.isDataValid([4])).toBeFalsy();
    expect(parser.isDataValid([null])).toBeFalsy();
    expect(parser.isDataValid([undefined])).toBeFalsy();
    expect(parser.isDataValid(["string and bool", true])).toBeFalsy();
});

