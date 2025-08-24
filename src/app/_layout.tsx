import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "./styles/global.css";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "SpaceMono-Regular": require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

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
        name="index"
        options={{
          title: "Bem-vindo",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: true
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: true
        }}
      />
      <Stack.Screen
        name="transactions"
        options={{
          title: "Transações",
          headerShown: false
        }}
      />
    </Stack>
  );
}
