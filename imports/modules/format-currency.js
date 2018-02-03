const formatCurrency = (value) => {
  if (value > 1e9) return `${Number.parseFloat(value / 1e9).toPrecision(3).toLocaleString()}B`;
  return `${Number.parseFloat(value / 1e6).toPrecision(3).toLocaleString()}M`;
};

export default formatCurrency;
