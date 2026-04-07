export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const truncateText = (text, maxLength = 40) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};

export const parseJSON = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
};
