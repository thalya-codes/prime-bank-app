import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { Card } from "@/components";
import { AnalysisSkeleton } from "@/components/Skeletons";
import { IAnalyticsResponseKpis, useGetAnalytics } from "@/features/analytics/queries";
import { MonthlyBarChart, TransactionPieChart } from "@/features/transactions/components";
import { currencyMask } from "@/utils/masks";
import { cn } from "@/utils/twClassnamesResolver";

import {
  MOCK_TRANSACTIONS,
  TransactionMovement,
} from "../TransactionsPage/data";


type AnalysisMode = "summary" | "detailed";

type SummaryMetrics = {
  totalTransactions: number;
  totalIncome: number;
  totalExpense: number;
};

type MonthlyAggregation = {
  label: string;
  total: number;
  income: number;
  expense: number;
  monthStart: Date;
};

type PieSlice = {
  label: string;
  value: number;
  movement: TransactionMovement;
};

type BarItem = {
  label: string;
  value: number;
};

const MODE_KEYS: AnalysisMode[] = ["summary", "detailed"];

const MODE_LABEL: Record<AnalysisMode, string> = {
  summary: "Resumido",
  detailed: "Detalhado",
};

export function AnalysisPage() {
  const [mode, setMode] = useState<AnalysisMode>("summary");
  const { width } = useWindowDimensions();

  const {
    data,
    refetch,
    isLoading: isAnalyticsLoading,
    isFetching: isAnalyticsFetching,
  } = useGetAnalytics();
  const hasFocusedRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (hasFocusedRef.current) {
        refetch();
      } else {
        hasFocusedRef.current = true;
      }
    }, [refetch])
  );

  const chartWidth = Math.max(Math.min(width - 80, 360), 220);

  const transactions = useMemo(() => MOCK_TRANSACTIONS.slice(), []);
  const shouldShowAnalysisSkeleton =
    !data && (isAnalyticsLoading || isAnalyticsFetching);

  const summaryMetrics = useMemo<SummaryMetrics>(() => {
    return transactions.reduce<SummaryMetrics>(
      (accumulator, transaction) => {
        if (transaction.type === "income") {
          accumulator.totalIncome += transaction.amount;
        } else {
          accumulator.totalExpense += transaction.amount;
        }

        accumulator.totalTransactions += 1;
        return accumulator;
      },
      { totalTransactions: 0, totalIncome: 0, totalExpense: 0 }
    );
  }, [transactions]);

  const monthlyFlow = useMemo<MonthlyAggregation[]>(() => {
    const now = new Date();
    const baseMonths = Array.from({ length: 6 }).map((_, index) => {
      const monthStart = new Date(
        now.getFullYear(),
        now.getMonth() - (5 - index),
        1
      );

      return {
        label: monthStart.toLocaleDateString("pt-BR", { month: "short" }),
        total: 0,
        income: 0,
        expense: 0,
        monthStart,
      } as MonthlyAggregation;
    });

    const monthMap = new Map<number, MonthlyAggregation>();
    baseMonths.forEach((month) => {
      monthMap.set(month.monthStart.getTime(), { ...month });
    });

    transactions.forEach((transaction) => {
      const txDate = new Date(transaction.date);
      const monthStart = new Date(txDate.getFullYear(), txDate.getMonth(), 1);
      const key = monthStart.getTime();

      if (!monthMap.has(key)) {
        monthMap.set(key, {
          label: monthStart.toLocaleDateString("pt-BR", { month: "short" }),
          total: 0,
          income: 0,
          expense: 0,
          monthStart,
        });
      }

      const aggregated = monthMap.get(key);
      if (!aggregated) {
        return;
      }

      if (transaction.type === "income") {
        aggregated.income += transaction.amount;
        aggregated.total += transaction.amount;
      } else {
        aggregated.expense += transaction.amount;
        aggregated.total -= transaction.amount;
      }
    });

    return Array.from(monthMap.values())
      .sort(
        (first, second) =>
          first.monthStart.getTime() - second.monthStart.getTime()
      )
      .slice(-6);
  }, [transactions]);

  const pieDistribution = useMemo<PieSlice[]>(() => {
    const totals: Record<TransactionMovement, number> = {
      received: 0,
      sended: 0,
    };

    transactions.forEach((transaction) => {
      totals[transaction.movement] += transaction.amount;
    });

    return (Object.keys(totals) as TransactionMovement[]).map((movement) => {
      const label =
        movement === "received"
          ? "Depósitos"
          : movement === "sended"
            ? "Pagamentos"
            : "Transferências";

      return {
        label,
        value: totals[movement],
        movement,
      };
    });
  }, [transactions]);

  const incomeVsExpense = useMemo<BarItem[]>(() => {
    return [
      { label: "Receitas", value: summaryMetrics.totalIncome },
      { label: "Despesas", value: summaryMetrics.totalExpense },
    ];
  }, [summaryMetrics.totalExpense, summaryMetrics.totalIncome]);

  if (shouldShowAnalysisSkeleton) {
    return (
      <View className='flex-1 px-5 pt-5 pb-8 bg-gray-100'>
        <AnalysisSkeleton />
      </View>
    );
  }

  return (
    <View className='flex-1 px-5 pt-5 pb-8 bg-gray-100'>
      <Card className='border border-[#D4DAE3]'>
        <Text className='text-2xl text-gray-900 font-nunito-semi-bold'>
          Análise financeira
        </Text>
        <Text className='mt-1 text-sm text-gray-500'>
          Escolha o modo para visualizar seus dados.
        </Text>
        <View className='flex-row gap-3 p-1 mt-6 bg-white rounded-full shadow-sm'>
          {MODE_KEYS.map((currentMode) => {
            const isActive = mode === currentMode;
            return (
              <TouchableOpacity
                key={currentMode}
                className={cn(
                  "border border-[#D4DAE3] flex-1 py-3 rounded-xl",
                  isActive ? "bg-brand-600" : undefined
                )}
                onPress={() => setMode(currentMode)}
                activeOpacity={0.7}
              >
                <Text
                  className={cn(
                    "text-center font-nunito-semi-bold",
                    isActive ? "text-white" : "text-gray-700"
                  )}
                >
                  {MODE_LABEL[currentMode]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      {mode === "summary" ? (
        <SummaryView metrics={data?.kpis!} />
      ) : (
        <DetailedView
          monthlyFlow={monthlyFlow}
          pieDistribution={pieDistribution}
          incomeVsExpense={incomeVsExpense}
          chartWidth={chartWidth}
        />
      )}
    </View>
  );
}

function SummaryView({ metrics }: { metrics: IAnalyticsResponseKpis }) {
  return (
    <View className='gap-3 mt-8 space-y-3'>
      <Card className='border border-[#D4DAE3]'>
        <Text className='text-sm text-gray-500'>Total de transações</Text>
        <Text className='mt-2 text-3xl text-gray-900 font-nunito-bold'>
          {metrics?.totalTransactions}
        </Text>
      </Card>
      <Card className='border border-[#D4DAE3]'>
        <Text className='text-sm text-gray-500'>Transações recebidas</Text>
        <Text className='mt-2 text-3xl text-green-600 font-nunito-bold'>
          {currencyMask(metrics?.receivedAmount)}
        </Text>
      </Card>
      <Card className='border border-[#D4DAE3]'>
        <Text className='text-sm text-gray-500'>Transações realizadas</Text>
        <Text className='mt-2 text-3xl text-red-600 font-nunito-bold'>
          {currencyMask(metrics?.totalAmountMoved)}
        </Text>
      </Card>
    </View>
  );
}

function DetailedView({
  chartWidth,
}: {
  monthlyFlow: MonthlyAggregation[];
  pieDistribution: PieSlice[];
  incomeVsExpense: BarItem[];
  chartWidth: number;
}) {
  const { data } = useGetAnalytics();

  return (
    <ScrollView
      className='mt-6'
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <Card className='mb-4 border border-gray-200'>
        <Text className='mb-4 text-base text-gray-800 font-nunito-semi-bold'>
          Distribuição de Receitas x Despesas
        </Text>
        <TransactionPieChart
          revenueVsExpenses={data?.charts?.revenueVsExpenses}
          size={chartWidth}
        />
      </Card>

      {data?.charts?.monthlyFlowData && (
        <Card className='mb-4 border border-gray-200'>
          <Text className='mb-4 text-base text-gray-800 font-nunito-semi-bold'>
            Fluxo financeiro mensal
          </Text>
          <MonthlyBarChart
            monthlyData={data?.charts?.monthlyFlowData || []}
            width={chartWidth}
            height={200}
          />
        </Card>
      )}
    </ScrollView>
  );
}
