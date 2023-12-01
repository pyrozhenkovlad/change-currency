import { validateInput } from "../utils/inputValidator";

describe("Input Validator", () => {
  test("should validate input within the specified range", () => {
    const firstValidCase = validateInput(1000);
    const firstInvalidCase = validateInput(-500);
    const secondValidCase = validateInput(10000000);
    const secondInvalidCase = validateInput(10000001);

    expect(firstValidCase).toBe(true);
    expect(firstInvalidCase).toBe(false);
    expect(secondValidCase).toBe(true);
    expect(secondInvalidCase).toBe(false);
  });
});