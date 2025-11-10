import { IAnalyticsResponse } from '@/features/analytics/queries';
import { currencyMask } from "@/utils/masks";
import { Text, View } from "react-native";
import Svg, { Path, Text as SvgText } from "react-native-svg";

export function TransactionPieChart({
  revenueVsExpenses,
  size = 300,
}: {
  revenueVsExpenses?: IAnalyticsResponse['charts']['revenueVsExpenses'];
  size?: number;
}) {

  const radius = size / 3;
  const center = radius;

  if (!revenueVsExpenses || revenueVsExpenses.length === 0) {
    return (
      <View className="items-center">
        <Text className="text-sm text-gray-500">
          Não há dados disponíveis para exibir o gráfico.
        </Text>
      </View>
    );
  }

  const absoluteValues = revenueVsExpenses.map(item => ({ ...item, absValue: Math.abs(item.value) }));
  const total = absoluteValues.reduce((acc, item) => acc + item.absValue, 0);

  if (total === 0) {
    return (
      <View className="items-center">
        <Svg width={radius * 2} height={radius * 2}>
          <Path
            d={`M ${center} ${center} L ${center} 0 A ${radius} ${radius} 0 1 1 ${center - 0.01} 0 Z`}
            fill="#D4D4D8"
          />
          <SvgText
            x={center}
            y={center}
            fill="#6B7280"
            fontSize={14}
            fontWeight="600"
            textAnchor="middle"
          >
            0%
          </SvgText>
        </Svg>

        <View className="w-full mt-4">
          {revenueVsExpenses.map((item, index) => (
            <View key={index} className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center">
                <View
                  className="w-3 h-3 mr-2 rounded-full"
                  style={{ backgroundColor: '#80c343' }}
                />
                <Text className="text-sm text-gray-700">{item.name}</Text>
              </View>
              <Text className="text-sm font-medium">
                {currencyMask(0)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  let startAngle = 0;

  const slices = absoluteValues.map((item) => {
    const absValue = item.absValue;
    const angle = absValue === 0 ? 1 : (absValue / total) * 360;
    const isFullCircle = angle >= 360;
    const effectiveAngle = isFullCircle ? 360 : angle;
    const endAngle = startAngle + effectiveAngle;
    const path = isFullCircle
      ? describeFullCircle(center, center, radius, startAngle)
      : describePieSlice(center, center, radius, startAngle, endAngle);
    const labelAngle = startAngle + effectiveAngle / 2;
    const percentage = absValue === 0 ? "0" : ((absValue / total) * 100).toFixed(0);

    const defaultColors = {
      "Receitas": "#80c343",
      "Despesas": "#E53935"
    };

    const color = item.color || defaultColors[item.name as keyof typeof defaultColors] || "#CCCCCC";

    const labelPosition = polarToCartesian(
      center,
      center,
      radius * 0.7,
      labelAngle
    );

    const result = {
      path,
      name: item.name,
      value: Math.abs(item.value),
      rawValue: item.value,
      percentage,
      color: color,
      labelPosition,
    };

    startAngle = endAngle;
    return result;
  });

  return (
    <View className="items-center">
      <Svg width={radius * 2} height={radius * 2}>
        {slices.map((slice, index) => (
          <Path
            key={index}
            d={slice.path}
            fill={slice.color || "#CCCCCC"}
            strokeWidth={1}
          />
        ))}
        {slices.map((slice, index) => (
          (slice.value > 0 || slice.percentage !== "0") && (
            <SvgText
              key={`label-${index}`}
              x={slice.labelPosition.x}
              y={slice.labelPosition.y}
              fill="#434343"
              fontSize={14}
              fontWeight="600"
              textAnchor="middle"
            >
              {slice.percentage + "%"}
            </SvgText>
          )
        ))}
      </Svg>

      <View className="w-full mt-4">
        {slices.map((slice, index) => (
          <View key={index} className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <View
                className="w-3 h-3 mr-2 rounded-full"
                style={{ backgroundColor: slice.color }}
              />
              <Text className="text-sm text-gray-700">{slice.name}</Text>
            </View>
            <Text className="text-sm font-medium">
              {currencyMask(slice.rawValue || slice.value)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
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

function describeFullCircle(
  x: number,
  y: number,
  radius: number,
  startAngle: number
) {
  const midAngle = startAngle + 180;
  const start = polarToCartesian(x, y, radius, startAngle);
  const mid = polarToCartesian(x, y, radius, midAngle);

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
    1,
    1,
    mid.x,
    mid.y,
    "A",
    radius,
    radius,
    0,
    1,
    1,
    start.x,
    start.y,
    "Z",
  ].join(" ");
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
