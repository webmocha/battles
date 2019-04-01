const percentChange = (oldVal: number, newVal: number): number => {
  const result = ((newVal - oldVal) / oldVal) * 100;
  return Math.round(result * 100) / 100;
};

export default percentChange;
