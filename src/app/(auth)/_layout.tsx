import { AuthProvider } from "@/providers/AuthProvider";
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
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import ToastManager from "toastify-react-native";
import "../styles/global.css";

if (__DEV__) {
  require("../../../ReactotronConfig");
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
      <Stack initialRouteName='login'>
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
        <Stack.Screen
          name='forgot-password'
          options={{
            title: "Esqueci a Senha",
          }}
        />
        <Stack.Screen
          name='create-account'
          options={{
            title: "Criar conta",
          }}
        />
      </Stack>
      <ToastManager />
    </AuthProvider>
  );
}

