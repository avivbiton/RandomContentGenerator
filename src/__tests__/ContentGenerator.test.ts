import { ContentGenerator } from "../ContentGenerator";
import { InvalidParserException } from "../Exceptions/InvalidParserException";

test("build throws InvalidParserException when parser is null", () => {
	function buildContent() {
		let schema = {
			fields: {
				invalid: {
					someinvalidproperty: "should throw"
				}
			}
		};
		let content = new ContentGenerator(schema);
		content.build();
	}

	expect(buildContent).toThrowError(InvalidParserException);
});
