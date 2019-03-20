import { ContentGenerator } from "./src/ContentGenerator";
import exampleSchema from "./exampleSchema.json";

let gen = new ContentGenerator(exampleSchema);
console.log(gen.build());
