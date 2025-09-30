export function cpfMask(value: string) {
  return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

export function phoneMask(value: string) {
  const cleanedValue = value.replace(/\D/g, "");

  if (cleanedValue.length <= 10) {
    return cleanedValue.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  } else {
    return cleanedValue.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }
}

export function currencyMask(value: string): string {
  const cleanedValue = value.replace(/\D/g, "");

  if (!cleanedValue) return "";
  const numberValue = parseInt(cleanedValue, 10) / 100;

  return numberValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function removeCurrencyMask(value: string): string {
  return value.replace(/\D/g, "");
}

export function currencyToNumber(value: string): number {
  const cleanedValue = value.replace(/\D/g, "");
  return parseInt(cleanedValue, 10) / 100;
}
