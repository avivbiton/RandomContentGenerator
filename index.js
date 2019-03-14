"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generator_1 = require("./generator");
var exampleSchema = require("./exampleSchema.json");
var gen = new generator_1.generator(exampleSchema);
console.log(gen.build());
