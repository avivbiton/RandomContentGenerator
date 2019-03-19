import { ContentGenerator } from "./src/ContentGenerator";
const exampleSchema = require("./exampleSchema.json");

let gen = new ContentGenerator(exampleSchema);
console.log(gen.build());
