type FirestoreTimestamp = {
  _seconds: number;
  _nanoseconds: number;
};

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

export function firestoreToZulu(timestamp: FirestoreTimestamp): Date {
  return new Date(
    timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6
  );
}

export function currencyMasks(value: string): string {
  const cleanedValue = value.replace(/\D/g, "");

  if (!cleanedValue) return "";
  const numberValue = parseInt(cleanedValue, 10) / 100;

  return numberValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function currencyToNumbers(value: string): number {
  const cleanedValue = value.replace(/\D/g, "");
  return parseInt(cleanedValue, 10) / 100;
}
