import { generator } from "./generator";
const exampleSchema = require("./exampleSchema.json");

let gen = new generator(exampleSchema);
console.log(gen.build());
