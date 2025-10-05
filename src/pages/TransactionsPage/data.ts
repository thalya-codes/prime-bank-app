export type TransactionType = "income" | "expense";
export type TransactionMovement = "deposit" | "payment" | "transfer";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: Date;
  receiptUrl?: string;
  notes?: string; 
  movement: TransactionMovement;
}

export const MOCK_CATEGORIES = [
  "Alimentação",
  "Transporte",
  "Lazer",
  "Saúde",
  "Educação",
  "Moradia",
  "Vestuário",
  "Outros",
  "Salário",
  "Investimentos",
  "Presentes",
  "Freelance",
];

const transferCategories = new Set<string>(["Investimentos", "Outros"]);

export const generateMockTransactions = (count = 20): Transaction[] =>
  Array(count)
    .fill(0)
    .map((_, index) => {
      const type: TransactionType = Math.random() > 0.5 ? "income" : "expense";
      const category =
        MOCK_CATEGORIES[Math.floor(Math.random() * MOCK_CATEGORIES.length)];

      const movement: TransactionMovement = (() => {
        if (type === "income") {
          return transferCategories.has(category) ? "transfer" : "deposit";
        }

        if (transferCategories.has(category)) {
          return "transfer";
        }

        return "payment";
      })();

      return {
        id: "transaction-" + index,
        description: "Transação " + (index + 1),
        amount: Math.random() * 1000,
        type,
        category,
        date: new Date(
          Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000
        ),
        notes:
          Math.random() > 0.7
            ? "Alguma observação sobre esta transação"
            : undefined,
        movement,
      };
    });

export const MOCK_TRANSACTIONS = generateMockTransactions();
