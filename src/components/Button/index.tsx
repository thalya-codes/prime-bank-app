import { cn } from "@/utils/twClassnamesResolver";
import { Text, TouchableOpacity } from "react-native";
import { IButton } from "./interface";

const bgByVariant = {
  primary: "bg-brand-600",
  secondary: "bg-brand-200 text-brand-800",
  neutral: "bg-neutral-300",
  link: "bg-transparent active:bg-brand-100",
};

const textByVariant = {
  secondary: "text-brand-800",
  link: "text-brand-500",
};

const Button = ({
  disabled = false,
  children,
  variant = "primary",
  textClassName,
  text,
  className,
  isFullWidth = true,
  ...props
}: IButton) => {
  const isSecondaryOrLink = variant === "secondary" || variant === "link";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={cn(
        isFullWidth && "w-full",
        "flex-1 flex-row items-center justify-center rounded-md px-2 py-3 flex gap-2 ease-in-out",
        bgByVariant[variant],
        className
      )}
      disabled={disabled}
      {...props}
    >
      <Text
        className={cn(
          "tracking-wider font-nunito-bold text-neutral-0 text-xl",
          isSecondaryOrLink && textByVariant[variant],
          disabled && "text-neutral-0",
          textClassName
        )}
      >
        {text}
      </Text>
      {children}
    </TouchableOpacity>
  );
};


export default Button