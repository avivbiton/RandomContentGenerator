import { Field } from "./Field";

export class Schema {
    fields: Array<Field>
    globalProperties: Array<Object>
    constructor(fields: Array<Field>, globalProperties: Array<Object>) {
        this.fields = fields;
        this.globalProperties = globalProperties;
    }
}