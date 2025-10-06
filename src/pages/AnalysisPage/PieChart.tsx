import { Text, View } from "react-native";
import Svg, { Path, Text as SvgText } from "react-native-svg";
import { TransactionMovement } from "../TransactionsPage/data";

const PIE_COLORS: Record<TransactionMovement, string> = {
  received: "#16A34A",
  sended: "#DC2626",
};

type PieSlice = {
  label: string;
  value: number;
  movement: TransactionMovement;
};

export function PieDistributionChart({
  data,
  size,
}: {
  data: PieSlice[];
  size: number;
}) {
  const radius = size / 3;
  const center = radius;
  const filtered = data.filter((item) => item.value > 0);
  const total = filtered.reduce(
    (accumulator, item) => accumulator + item.value,
    0
  );

  if (!total) {
    return (
      <Text className='text-sm text-gray-500'>
        Ainda não há volume registrado para exibir a distribuição.
      </Text>
    );
  }

  let startAngle = 0;

  const slices = filtered.map((slice) => {
    const angle = (slice.value / total) * 360;
    const endAngle = startAngle + angle;
    const path = describePieSlice(center, center, radius, startAngle, endAngle);
    const labelAngle = startAngle + angle / 2;
    const percentage = ((slice.value / total) * 100).toFixed(1);
    startAngle = endAngle;

    const labelPosition = polarToCartesian(
      center,
      center,
      radius * 0.7,
      labelAngle
    );

    return {
      movement: slice.movement,
      path,
      label: slice.label,
      percentage,
      color: PIE_COLORS[slice.movement],
      labelPosition,
    };
  });

  return (
    <View className='flex-row items-center justify-between'>
      <Svg width={radius * 2} height={radius * 2}>
        {slices.map((slice) => (
          <Path key={slice.movement} d={slice.path} fill={slice.color} />
        ))}
        {slices.map((slice) => (
          <SvgText
            key={slice.movement + "-label"}
            x={slice.labelPosition.x}
            y={slice.labelPosition.y}
            fill='#FFFFFF'
            fontSize={12}
            fontWeight='600'
            textAnchor='middle'
          >
            {slice.percentage + "%"}
          </SvgText>
        ))}
      </Svg>

      <View className='flex-1 ml-4'>
        {data.map((slice) => (
          <View className='flex-row items-center mb-2' key={slice.movement}>
            <View
              className='w-3 h-3 mr-2 rounded-full'
              style={{ backgroundColor: PIE_COLORS[slice.movement] }}
            />
            <Text className='text-sm text-gray-700'>{slice.label}</Text>
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

