"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Parser_1 = require("../Parsers/Parser");

test("AddParsers should throw when adding null or undefined", function () {
  function nullInsert() {
    Parser_1.Parser.AddParsers([null]);
  }

  function undefinedInsert() {
    Parser_1.Parser.AddParsers([undefined]);
  }

  expect(nullInsert).toThrowError(TypeError);
  expect(undefinedInsert).toThrowError(TypeError);
});