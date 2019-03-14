export abstract class Parser {
	abstract parse(): string;

	clone(dataObject: object): Parser {
		if (this.validateData(dataObject) == false) return null;
		return this.cloneObject(dataObject);
	}
	protected abstract cloneObject(dataObject: object): Parser;

	protected validateData(data: object): boolean {
		const parserKeys = Object.keys(this);
		const dataKeys = Object.keys(data);

		for (let i = 0; i < parserKeys.length; i++) {
			const parserKeyName = parserKeys[i];

			if (typeof this[parserKeyName] === "function") continue;
			const index = dataKeys.indexOf(parserKeyName);
			if (
				index == -1 ||
				typeof data[dataKeys[i]] !== typeof this[parserKeyName]
			)
				return false;
		}
		return true;
	}
}
