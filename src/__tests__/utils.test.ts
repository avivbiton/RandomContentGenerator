import { randomNumber } from "../utils";

test("randomNumber - max random number is exclusive", () => {
	expect(randomNumber(0, 1)).toBe(0);
});

test("randomNumber - number is not higher than min", () => {
	expect(randomNumber(1, 2)).not.toBeGreaterThan(1);
});
