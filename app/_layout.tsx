import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import "../global.css";
import { useEffect, useState } from "react";
import CustomSplashScreen from "@/components/SplashScreen";
import Animated, { FadeIn } from "react-native-reanimated";
import { UserInActivityProvider } from "@/context/UserInActivity";

// SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

  const [loaded, error] = useFonts({
    "JosefinSans-Regular": require("../assets/fonts/JosefinSans-Regular.ttf"),
    "JosefinSans-Bold": require("../assets/fonts/JosefinSans-Bold.ttf"),
    "JosefinSans-SemiBold": require("../assets/fonts/JosefinSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      // SplashScreen.hideAsync();
      setAppReady(true);
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (!appReady || !splashAnimationFinished) {
    return (
      <CustomSplashScreen
        onAnimationFinish={(isCancelled) => {
          console.warn("Animation finished");
          if (!isCancelled) setSplashAnimationFinished(true);
        }}
      />
    );
  }

  return (
    <UserInActivityProvider>
      <Animated.View entering={FadeIn} style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Animated.View>
    </UserInActivityProvider>
  );
};

export default RootLayout;
