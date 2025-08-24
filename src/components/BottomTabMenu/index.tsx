import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export function BottomTabMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    {
      icon: 'home-outline',
      activeIcon: 'home',
      label: 'Home',
      path: '/home',
    },
    {
      icon: 'swap-horizontal-outline',
      activeIcon: 'swap-horizontal',
      label: 'Transações',
      path: '/transactions',
    },
    {
      icon: 'person-outline',
      activeIcon: 'person',
      label: 'Perfil',
      path: '/profile', // Será implementado futuramente
    },
  ];

  return (
    <View className="flex-row justify-around items-center bg-white border-t border-gray-200 pt-2 pb-6">
      {menuItems.map((item) => {
        const active = isActive(item.path);
        return (
          <TouchableOpacity
            key={item.path}
            className="items-center"
            onPress={() => {
              if (item.path === '/profile') {
                // Implementação futura
                return;
              }
              // @ts-ignore - Ignorando erros de tipo para fins de demonstração
              router.push(item.path.replace('/', ''));
            }}
          >
            <Ionicons
              name={active ? item.activeIcon : item.icon as any}
              size={24}
              color={active ? '#3B82F6' : '#94A3B8'}
            />
            <Text
              className={`text-xs mt-1 ${active ? 'text-blue-500 font-medium' : 'text-gray-500'
                }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
