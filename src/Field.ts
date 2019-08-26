import { Parser } from './Parsers/Parser';
export class Field {
    name: string
    data: object

    constructor(name: string, data: object) {
        this.name = name;
        this.data = data;
    }

}