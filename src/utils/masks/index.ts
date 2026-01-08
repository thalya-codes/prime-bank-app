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
  return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6);
}

export function currencyMasks(value: string): string {
  if (!value) {
    return value;
  }

  const cleanedValue = value.replace(/\D/g, "");

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

export function currencyToNumbers(value: string): number {
  const valueRemoved = value.replace(",", "");

  const sizeSlice = valueRemoved.length - 2;
  const newValue = [
    valueRemoved.slice(0, sizeSlice),
    ".",
    valueRemoved.slice(sizeSlice),
  ].join("");

  return parseInt(newValue);
}

