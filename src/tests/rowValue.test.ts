import { validateEditableRowValue } from "../utils/rowValueValidator";

describe("Row value Validator", () => {
  test("should validate input within the specified range", () => {
    const firstValidCase = validateEditableRowValue(900, 1000);
    const firstInvalidCase = validateEditableRowValue(33, 41.53);
    const secondValidCase = validateEditableRowValue(1.5, 1.64);
    const secondInvalidCase = validateEditableRowValue(0.2, 0.25);

    expect(firstValidCase).toBe(true);
    expect(firstInvalidCase).toBe(false);
    expect(secondValidCase).toBe(true);
    expect(secondInvalidCase).toBe(false);
  });
});
