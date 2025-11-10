export function buildTransactionData(
  accountNumber: string | undefined,
  amount: string | number,
  receipt: any,
): any {
  return {
    fromAccountNumber: accountNumber,
    toAccountNumber: accountNumber,
    amount: Number(amount),
    anexo: receipt
  };
}

export function extractErrorMessage(error: any, defaultMessage: string = "Tente novamente"): string {
  return error.response?.data?.message || defaultMessage;
}