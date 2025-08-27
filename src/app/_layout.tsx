import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold_Italic,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts as useFontsInter,
} from "@expo-google-fonts/inter";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  useFonts as useFontsNunito,
} from "@expo-google-fonts/nunito";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "./styles/global.css";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [nunitoLoaded] = useFontsNunito({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const [interLoaded] = useFontsInter({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold_Italic,
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
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: "Bem-vindo",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='login'
        options={{
          title: "Login",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name='home'
        options={{
          title: "Home",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name='transactions'
        options={{
          title: "Transações",
          headerShown: false,
        }}
      />
    </Stack>
  );
}

