import { IAnalyticsResponse } from '@/features/analytics/queries';
import { currencyMask } from '@/utils/masks';
import { Dimensions, Text, View } from 'react-native';
import Svg, { G, Line, Rect, Text as SvgText } from 'react-native-svg';

export function MonthlyBarChart({
  monthlyData,
  width = Dimensions.get('window').width - 64,
  height = 220,
}: {
  monthlyData: IAnalyticsResponse['charts']['monthlyFlowData'];
  width?: number;
  height?: number;
}) {
  if (!monthlyData || monthlyData.length === 0) {
    return (
      <View className="items-center justify-center" style={{ height }}>
        <Text className="text-sm text-gray-500">
          Ainda não há dados suficientes para gerar o gráfico.
        </Text>
      </View>
    );
  }

  // Configuração do gráfico
  const verticalPadding = 20;
  const horizontalPadding = 30;
  const usableHeight = height - verticalPadding * 2;
  const usableWidth = Math.max(width - horizontalPadding * 2, 1);
  const baselineY = height - verticalPadding;

  // Calcular a largura de cada grupo de barras
  const groupWidth = usableWidth / monthlyData.length;
  const barWidth = groupWidth * 0.4; // Cada barra ocupa 40% da largura do grupo
  const barGap = groupWidth * 0.2; // 20% de espaço entre barras do mesmo grupo

  // Encontrar valores máximos para escala
  let maxValue = 0;
  for (const month of monthlyData) {
    maxValue = Math.max(maxValue, month.income, month.expense);
  }

  // Adiciona 20% para ter margem no topo
  maxValue = maxValue > 0 ? maxValue * 1.2 : 100;

  // Função para calcular a altura da barra com base no valor
  const calculateBarHeight = (value: number) => {
    return (value / maxValue) * usableHeight;
  };

  // Cores para o gráfico
  const colors = {
    income: '#80c343', // verde
    expense: '#E53935', // vermelho
    axis: '#D4D4D8',   // cinza claro
  };

  return (
    <View>
      <Svg width={width} height={height}>
        {/* Eixos */}
        <Line
          x1={horizontalPadding}
          y1={baselineY}
          x2={width - horizontalPadding}
          y2={baselineY}
          stroke={colors.axis}
          strokeWidth={1}
        />

        <Line
          x1={horizontalPadding}
          y1={verticalPadding}
          x2={horizontalPadding}
          y2={baselineY}
          stroke={colors.axis}
          strokeWidth={1}
        />

        {/* Marcas horizontais na escala */}
        {[0.25, 0.5, 0.75].map((fraction, index) => {
          const y = baselineY - usableHeight * fraction;
          return (
            <G key={`grid-${index}`}>
              <Line
                x1={horizontalPadding}
                y1={y}
                x2={width - horizontalPadding}
                y2={y}
                stroke={colors.axis}
                strokeWidth={0.5}
                strokeDasharray="5,5"
              />
              <SvgText
                x={horizontalPadding - 5}
                y={y + 4}
                fontSize={8}
                fill="#9CA3AF"
                textAnchor="end"
              >
                {currencyMask(maxValue * fraction).split(',')[0]}
              </SvgText>
            </G>
          );
        })}

        {/* Barras de dados */}
        {monthlyData.map((month, index) => {
          const groupX = horizontalPadding + (index * groupWidth);
          const incomeX = groupX;
          const expenseX = groupX + barWidth + barGap;

          const incomeHeight = calculateBarHeight(month.income);
          const expenseHeight = calculateBarHeight(month.expense);

          return (
            <G key={`month-${index}`}>
              {/* Barra de receitas */}
              <Rect
                x={incomeX}
                y={baselineY - incomeHeight}
                width={barWidth}
                height={incomeHeight}
                fill={colors.income}
                rx={2}
              />

              {/* Barra de despesas */}
              <Rect
                x={expenseX}
                y={baselineY - expenseHeight}
                width={barWidth}
                height={expenseHeight}
                fill={colors.expense}
                rx={2}
              />

              {/* Label do mês */}
              <SvgText
                x={groupX + groupWidth / 2}
                y={baselineY + 16}
                fontSize={10}
                fill="#4B5563"
                textAnchor="middle"
              >
                {month.label.replace(' ', '\n')}
              </SvgText>

              {/* Valores acima das barras se forem significativos */}
              {month.income > 0 && (
                <SvgText
                  x={incomeX + barWidth / 2}
                  y={baselineY - incomeHeight - 5}
                  fontSize={8}
                  fill="#4B5563"
                  textAnchor="middle"
                >
                  {month.income}
                </SvgText>
              )}

              {month.expense > 0 && (
                <SvgText
                  x={expenseX + barWidth / 2}
                  y={baselineY - expenseHeight - 5}
                  fontSize={8}
                  fill="#4B5563"
                  textAnchor="middle"
                >
                  {month.expense}
                </SvgText>
              )}
            </G>
          );
        })}
      </Svg>

      {/* Legenda */}
      <View className="justify-center pt-2 mt-4 space-x-6 flex-column">
        <View className="flex-row items-center">
          <View
            className="w-3 h-3 mr-2 rounded-full"
            style={{ backgroundColor: colors.income }}
          />
          <Text className="text-sm text-gray-700">Receitas</Text>
        </View>
        <View className="flex-row items-center">
          <View
            className="w-3 h-3 mr-2 rounded-full"
            style={{ backgroundColor: colors.expense }}
          />
          <Text className="text-sm text-gray-700">Despesas</Text>
        </View>
      </View>
    </View>
  );
}