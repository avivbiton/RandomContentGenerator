export class InvalidParserException {
	message: string;

	/**
	 * Contains an additional information about the specific case where this exception was thrown. (Optional)
	 */
	information: string;
	dataObject: object;
	constructor(dataObject: object, information = "") {
		this.message =
			"Parser is invalid or null due to invalid data object or schema. (No available parsers found compatible with the given data object)";
		this.dataObject = dataObject;
		this.information = information;
	}

	public toString(): string {
		return `${this.message}\n ${JSON.stringify(this.dataObject)}`;
	}
}
