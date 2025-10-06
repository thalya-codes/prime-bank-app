import { useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Svg, {
  Circle,
  G,
  Path,
  Rect,
  Line as SvgLine,
  Text as SvgText,
} from "react-native-svg";

import { Card } from "@/components";
import { IAnalyticsResponseKpis, useGetAnalytics } from "@/features/analytics/queries";
import { currencyMask } from "@/utils/masks";
import { cn } from "@/utils/twClassnamesResolver";
import {
  MOCK_TRANSACTIONS,
  TransactionMovement,
} from "../TransactionsPage/data";
import { PieDistributionChart } from "./PieChart";

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

const PIE_COLORS: Record<TransactionMovement, string> = {
  deposit: "#16A34A",
  payment: "#DC2626",
  transfer: "#2563EB",
};

const FADED_AXIS = "#D4D4D8";

export function AnalysisPage() {
  const [mode, setMode] = useState<AnalysisMode>("summary");
  const { width } = useWindowDimensions();

  const {data} = useGetAnalytics()
  /*   const {
      data: transactionsData,
      isLoading: isLoadingTransactionsList,
    } = useQuery(transactionQueries.list()); */

  const chartWidth = Math.max(Math.min(width - 80, 360), 220);

  const transactions = useMemo(() => MOCK_TRANSACTIONS.slice(), []);

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

  console.warn('HEY', data?.kpis)
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
          {metrics.totalTransactions}
        </Text>
      </Card>
      <Card className='border border-[#D4DAE3]'>
        <Text className='text-sm text-gray-500'>Transações recebidas</Text>
        <Text className='mt-2 text-3xl text-green-600 font-nunito-bold'>
          {currencyMask(metrics.receivedAmount)}
        </Text>
      </Card>
      <Card className='border border-[#D4DAE3]'>
        <Text className='text-sm text-gray-500'>Transações realizadas</Text>
        <Text className='mt-2 text-3xl text-red-600 font-nunito-bold'>
          {currencyMask(metrics.totalAmountMoved)}
        </Text>
      </Card>
    </View>
  );
}

function DetailedView({
  monthlyFlow,
  pieDistribution,
  incomeVsExpense,
  chartWidth,
}: {
  monthlyFlow: MonthlyAggregation[];
  pieDistribution: PieSlice[];
  incomeVsExpense: BarItem[];
  chartWidth: number;
}) {
  const { data } = useGetAnalytics();

  const distributionByType = data?.charts?.distributionByType!;
  const formattedDistributionByType: PieSlice[] = [
    {
      label: distributionByType ? distributionByType[0]?.name : "",
      movement: "received",
      value: distributionByType ? distributionByType[0]?.count : 0,
    },
    {
      label: distributionByType ? distributionByType[1]?.name : "",
      movement: "sended",
      value: distributionByType ? distributionByType[1]?.count : 0,
    },
  ];

  return (
    <ScrollView
      className='mt-6'
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* <Card className='mb-4 border border-gray-200'>
        <Text className='mb-4 text-base text-gray-800 font-nunito-semi-bold'>
          Fluxo financeiro mensal
        </Text>
        <MonthlyFlowChart
          data={[
            {
              expense: data?.charts?.monthlyFlowData?.expense,
              income: data?.charts?.monthlyFlowData?.income,
              label: data?.charts?.monthlyFlowData?.label,
              monthStart: data?.charts?.monthlyFlowData?.monthStart,
              total: 200,
            },
          ]}
          width={chartWidth}
          height={200}
        />
      </Card> */}

      <Card className='mb-4 border border-gray-200'>
        <Text className='mb-4 text-base text-gray-800 font-nunito-semi-bold'>
          Distribuição por tipo de transação
        </Text>
        <PieDistributionChart
          data={formattedDistributionByType}
          size={chartWidth}
        />
      </Card>
    </ScrollView>
  );
}

function MonthlyFlowChart({
  data,
  width,
  height,
}: {
  data: MonthlyAggregation[];
  width: number;
  height: number;
}) {
  if (!data.length) {
    return (
      <Text className='text-sm text-gray-500'>
        Ainda não há dados suficientes para gerar o gráfico.
      </Text>
    );
  }

  const values = data.map((item) => item.total);
  const maxValue = Math.max.apply(null, values.concat(0));
  const minValue = Math.min.apply(null, values.concat(0));
  const range = maxValue - minValue || 1;
  const verticalPadding = 20;
  const horizontalPadding = 16;
  const usableHeight = height - verticalPadding * 2;
  const usableWidth = Math.max(width - horizontalPadding * 2, 1);
  const stepX = data.length > 1 ? usableWidth / (data.length - 1) : usableWidth;
  const baselineY = height - verticalPadding;

  const points = data.map((item, index) => {
    const normalized = (item.total - minValue) / range;
    const y = baselineY - normalized * usableHeight;
    const x =
      horizontalPadding + (data.length > 1 ? stepX * index : usableWidth / 2);

    return { x, y, label: item.label };
  });

  const pathCommands = points.map((point, index) => {
    const prefix = index === 0 ? "M" : "L";
    return prefix + point.x + " " + point.y;
  });

  const pathD = pathCommands.join(" ");

  return (
    <View>
      <Svg width={width} height={height}>
        <G>
          <SvgLine
            x1={horizontalPadding}
            y1={baselineY}
            x2={width - horizontalPadding}
            y2={baselineY}
            stroke={FADED_AXIS}
            strokeWidth={1}
          />

          <SvgLine
            x1={horizontalPadding}
            y1={verticalPadding}
            x2={horizontalPadding}
            y2={baselineY}
            stroke={FADED_AXIS}
            strokeWidth={1}
          />

          <Path d={pathD} stroke='#2563EB' strokeWidth={2} fill='none' />

          {points.map((point, index) => (
            <Circle
              key={point.label + "-" + index}
              cx={point.x}
              cy={point.y}
              r={4}
              fill='#2563EB'
            />
          ))}

          {points.map((point, index) => (
            <SvgText
              key={point.label + "-label-" + index}
              x={point.x}
              y={baselineY + 12}
              fontSize={10}
              fill='#4B5563'
              alignmentBaseline='hanging'
              textAnchor='middle'
            >
              {point.label}
            </SvgText>
          ))}
        </G>
      </Svg>
    </View>
  );
}

function IncomeVsExpenseChart({
  data,
  width,
  height,
}: {
  data: BarItem[];
  width: number;
  height: number;
}) {
  const maxValue = Math.max.apply(
    null,
    data.map((item) => item.value).concat(1)
  );
  const barWidth = width / (data.length * 2);
  const bottomOffset = 16;

  return (
    <Svg width={width} height={height}>
      <SvgLine
        x1={0}
        y1={height - bottomOffset}
        x2={width}
        y2={height - bottomOffset}
        stroke={FADED_AXIS}
        strokeWidth={1}
      />

      {data.map((item, index) => {
        const barHeight =
          ((item.value || 0) / maxValue) * (height - bottomOffset - 16);
        const x = barWidth + index * barWidth * 2;
        const y = height - bottomOffset - barHeight;
        const fill = index === 0 ? "#16A34A" : "#DC2626";

        return (
          <G key={item.label}>
            <Rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx={6}
              fill={fill}
            />
            <SvgText
              x={x + barWidth / 2}
              y={height - bottomOffset + 12}
              fontSize={12}
              fill='#4B5563'
              textAnchor='middle'
            >
              {item.label}
            </SvgText>
            <SvgText
              x={x + barWidth / 2}
              y={y - 6}
              fontSize={12}
              fill='#111827'
              textAnchor='middle'
            >
              {currencyMask(item.value)}
            </SvgText>
          </G>
        );
      })}
    </Svg>
  );
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describePieSlice(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(x, y, radius, startAngle);
  const end = polarToCartesian(x, y, radius, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    x,
    y,
    "L",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    1,
    end.x,
    end.y,
    "Z",
  ].join(" ");
}

