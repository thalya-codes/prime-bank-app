import React from 'react';
import { TouchableOpacity } from 'react-native';

type BadgeProps = {
  children?: React.ReactNode;
  color?: string;
  textColor?: string;
  onPress?: () => void;
  className?: any;
};

const Badge = ({ children, color = 'bg-blue-500', className, onPress }: BadgeProps) => {

  return (
    <TouchableOpacity className={`p-2 rounded-full ${color} ${className}`} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Badge;
