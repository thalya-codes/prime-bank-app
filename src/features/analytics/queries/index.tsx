import { AnalyticsService } from "@/services/analyticsService";
import { useQuery } from "@tanstack/react-query";

export interface IAnalyticsResponseKpis {
  totalTransactions: number;
  totalAmountMoved: number;
  receivedAmount: number;
  sendedAmount: number;
  currentBalance: number;
}
export interface IAnalyticsResponse {
  kpis: IAnalyticsResponseKpis;
  charts: {
    revenueVsExpenses: {
      name: string; // "Receitas" ou "Despesas"
      value: number;
      color: string; // hex color
    }[];
    distributionByType: {
      name: string; // "Recebidas" ou "Transferidas"
      count: number;
      percentage: number; // exemplo: 66.67
      color: string; // hex color
    }[];
    distributionDetails: {
      sended: {
        count: number;
        percentage: string; // em formato "33.33%"
      };
      received: {
        count: number;
        percentage: string; // em formato "66.67%"
      };
    };
    monthlyFlowData: {
      label: string;
      income: number;
      expense: number;
      monthStart: string;
    }[];
  };
}

export const useGetAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: (): Promise<IAnalyticsResponse> => AnalyticsService.getAnalytics(),
  });
};

