export function phoneMask(value: string) {
  const cleanedValue = value.replace(/\D/g, "");

  if (cleanedValue.length <= 10) {
    return cleanedValue.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  } else {
    return cleanedValue.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }
}

export function currencyMask(
  amount: number,
  locale = "pt-BR",
  currency = "BRL"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("pt-BR");
};

export const formatMonthDate = (date: Date) => {
  return date.toLocaleString("pt-BR", { month: "long" });
};

export const formatDateTime = (zuluDate: Date) => {
  const date = new Date(zuluDate);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const formatted = `${day}/${month}/${year},\n ${hours}:${minutes}:${seconds}`;

  return formatted;
};

export function currencyMasks(value: string): string {
  const cleanedValue = value.replace(/\D/g, "");

  if (!cleanedValue) return "";
  const numberValue = parseInt(cleanedValue, 10) / 100;

  return numberValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function removeCurrencyMasks(value: string): string {
  return value.replace(/\D/g, "");
}

export function currencyToNumbers(value: string): number {
  const cleanedValue = value.replace(/\D/g, "");
  return parseInt(cleanedValue, 10) / 100;
}
