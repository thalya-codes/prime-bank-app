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
