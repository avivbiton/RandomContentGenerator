"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ContentGenerator_1 = require("./src/ContentGenerator");
var exampleSchema_json_1 = __importDefault(require("./exampleSchema.json"));
var gen = new ContentGenerator_1.ContentGenerator(exampleSchema_json_1.default);
console.log(gen.build());
//# sourceMappingURL=index.js.map