export const formatNumber = (value: number): string => {
  if (value < 1) {
    return value.toString();
  } else {
    return value.toFixed(2);
  }
};
