export const formatCurrency = (amount) => {
  if (typeof amount !== "number") return "$0.00";
  return `$${amount.toFixed(2)}`;
};

export const calculateTotal = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + (item.price || 0), 0);
};
