import { cn } from "@/utils/twClassnamesResolver";
import { View } from "react-native";
import { ICard } from "./interface";

const cardColorVariants = {
  "light-green": "bg-brand-50",
  "strong-green": "bg-brand-600",
  white: "bg-neutral-0",
};

const cardOutlineVariants = {
  "light-green": "border border-brand-500 shadow-none",
  white: "border border-neutral-200",
};

const Card = ({
  color = "white",
  isOutlined = false,
  children,
  className,
}: ICard) => {
  const isStrongGreenVariant = color === "strong-green";

  return (
    <View
      className={cn(
        "px-5 py-7 rounded-lg shadow-slate-50 shadow-md ",
        cardColorVariants[color],
        isOutlined && !isStrongGreenVariant && cardOutlineVariants[color],
        className
      )}
    >
      {children}
    </View>
  );
};

export default Card