import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "../global.css";
import { useEffect, useState } from "react";
import CustomSplashScreen from "@/components/SplashScreen";
import Animated, { FadeIn } from "react-native-reanimated";
import { UserInActivityProvider } from "@/context/UserInActivity";

const RootLayout = () => {
  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

  const [loaded, error] = useFonts({
    "Helvetica-Regular": require("../assets/fonts/HelveticaNowDisplay-Regular.ttf"),
    "Helvetica-Bold": require("../assets/fonts/HelveticaNowDisplay-Bold.ttf"),
    "Helvetica-ExtraBold": require("../assets/fonts/HelveticaNowDisplay-ExtraBold.ttf"),
    "Helvetica-Light": require("../assets/fonts/HelveticaNowDisplay-Light.ttf"),
    "Helvetica-Medium": require("../assets/fonts/HelveticaNowDisplay-Medium.ttf"),
    "Helvetica-Thin": require("../assets/fonts/HelveticaNowDisplay-Thin.ttf"),
    "Helvetica-ExtLt": require("../assets/fonts/HelveticaNowDisplay-ExtLt.ttf"),
  });

  useEffect(() => {
    if (!appReady && (loaded || error)) {
      setAppReady(true);
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  if (!appReady || !splashAnimationFinished) {
    return (
      <CustomSplashScreen
        onAnimationFinish={(isCancelled) => {
          console.warn("Animation finished");
          if (!isCancelled) {
            setSplashAnimationFinished(true);
          }
        }}
      />
    );
  }

  return (
    <UserInActivityProvider>
      <Animated.View entering={FadeIn} style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(modals)/lock" options={{ headerShown: false }} />
        </Stack>
      </Animated.View>
    </UserInActivityProvider>
  );
};

export default RootLayout;
