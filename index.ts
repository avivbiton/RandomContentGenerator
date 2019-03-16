import { ContentGenerator } from "./ContentGenerator";
const exampleSchema = require("./exampleSchema.json");

let gen = new ContentGenerator(exampleSchema);
console.log(gen.build());
