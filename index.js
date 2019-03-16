"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContentGenerator_1 = require("./ContentGenerator");
var exampleSchema = require("./exampleSchema.json");
var gen = new ContentGenerator_1.ContentGenerator(exampleSchema);
console.log(gen.build());
