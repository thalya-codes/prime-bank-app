import { cn } from "@/utils/twClassnamesResolver";
import { Text } from "react-native";

const classesBySize = {
  xs: "rounded-md p-1 text-xl w-10",
  sm: "rounded-lg p-4 text-4xl w-20",
};

export const Logo = ({ size = "sm" }: { size?: "xs" | "sm" }) => {
  return (
    <Text
      className={cn(
        "bg-brand-600 text-neutral-0 rounded-lg text-center items-center font-inter-black shadow-lg",
        classesBySize[size]
      )}
    >
      P
    </Text>
  );
};

