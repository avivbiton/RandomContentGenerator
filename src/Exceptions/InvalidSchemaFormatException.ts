export class InvalidSchemaFormatException {
	message: string;
	constructor(message?: string) {
		if (typeof message === "undefined") {
			this.message = "Schema has invalid format.";
		} else {
			this.message = message;
		}
	}

	public toString(): string {
		return this.message;
	}
}
