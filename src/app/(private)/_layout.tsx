import { queryClient } from "@/infrastructure/query/query-client";
import { PrivateScreenHeaderLayout } from "@/presentation/layouts/PrivateScreenHeaderLayout";
import { AuthProvider } from "@/presentation/providers/AuthProvider";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts as useFontsInter,
} from "@expo-google-fonts/inter";
import {
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  useFonts as useFontsNunito,
} from "@expo-google-fonts/nunito";
import { FontAwesome } from "@expo/vector-icons";
import { QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text } from "react-native";
import ToastManager from "toastify-react-native";
import "../styles/global.css";

if (__DEV__) {
  require("../../../Reactotron");
}

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [nunitoLoaded] = useFontsNunito({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const [interLoaded] = useFontsInter({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  const fontsLoaded = nunitoLoaded && interLoaded;

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the splash screen after fonts have loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Render null until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#24797A",
            tabBarInactiveTintColor: "#28B2AA",
            headerShown: true,
            header: () => <PrivateScreenHeaderLayout />,
          }}
        >
          <Tabs.Screen
            name='home'
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name='home' color={color} size={size} />
              ),
              tabBarLabel: ({ color }) => (
                <Text style={{ color, fontFamily: "Nunito_600SemiBold" }}>
                  Início
                </Text>
              ),
              title: "Início",
            }}
          />
          <Tabs.Screen
            name='transactions'
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name='exchange' color={color} size={size} />
              ),
              tabBarLabel: ({ color }) => (
                <Text style={{ color, fontFamily: "Nunito_600SemiBold" }}>
                  Extrato
                </Text>
              ),
            }}
          />

          <Tabs.Screen
            name='analysis'
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name='bar-chart' color={color} size={size} />
              ),
              tabBarLabel: ({ color }) => (
                <Text style={{ color, fontFamily: "Nunito_600SemiBold" }}>
                  Análise
                </Text>
              ),
            }}
          />
        </Tabs>
        <ToastManager />
      </QueryClientProvider>
    </AuthProvider>
  );
}

