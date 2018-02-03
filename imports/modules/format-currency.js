// format numbers as T (Trillion) B (Billion) M (Million) or K (thousands)
const formatCurrency = (value) => {
  if (Math.abs(value) > 1e12) return `${Number.parseFloat(value / 1e12).toPrecision(3).toLocaleString()}T`;
  else if (Math.abs(value) > 1e9) return `${Number.parseFloat(value / 1e9).toPrecision(3).toLocaleString()}B`;
  else if (Math.abs(value) > 1e6) return `${Number.parseFloat(value / 1e6).toPrecision(3).toLocaleString()}M`;
  return `${Number.parseFloat(value / 1e3).toPrecision(3).toLocaleString()}K`;
};

export default formatCurrency;
