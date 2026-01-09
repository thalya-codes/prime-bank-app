
function currencyMasks(value) {
  if (!value) {
    return value;
  }

  const cleanedValue = value.replace(/\D/g, "");
  console.log(`Input: "${value}", Cleaned: "${cleanedValue}"`);

  if (!cleanedValue) {
    console.log("Condição 2");
    return "";
  }

  const formattedValue = (Number(cleanedValue) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedValue;
}

console.log("Test '0':", `"${currencyMasks("0")}"`);
console.log("Test '0.0':", `"${currencyMasks("0.0")}"`);
console.log("Test '0,00':", `"${currencyMasks("0,00")}"`);
console.log("Test '10':", `"${currencyMasks("10")}"`);
