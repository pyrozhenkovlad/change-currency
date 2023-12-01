export const validateEditableRowValue = (
  value: number,
  baseValue: number
): boolean => {
  return value >= baseValue * 0.9 && value <= baseValue * 1.1;
};
