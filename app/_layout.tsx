import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "../global.css";
import { useEffect, useState } from "react";
import CustomSplashScreen from "@/components/SplashScreen";
import Animated, { FadeIn } from "react-native-reanimated";
import { UserInActivityProvider } from "@/context/UserInActivity";
import { NavigationContainer } from "@react-navigation/native";
import { Partition1Provider } from "@/context/firebase/Partition1Context";
import { Partition2Provider } from "@/context/firebase/Partition2Context";
import { Partition3Provider } from "@/context/firebase/Partition3Context";

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

  // if (!appReady || !splashAnimationFinished) {
  //   return (
  //     <CustomSplashScreen
  //       onAnimationFinish={(isCancelled) => {
  //         console.warn("Animation finished");
  //         if (!isCancelled) {
  //           setSplashAnimationFinished(true);
  //         }
  //       }}
  //     />
  //   );
  // }

  return (
    // <UserInActivityProvider>
    <Partition1Provider>
      <Partition2Provider>
        <Partition3Provider>
          <Animated.View entering={FadeIn} style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(modals)"
                options={{
                  headerShown: false,
                  title: "",
                  presentation: "modal",
                }}
              />
            </Stack>
          </Animated.View>
        </Partition3Provider>
      </Partition2Provider>
    </Partition1Provider>
    // </UserInActivityProvider>
  );
};

export default RootLayout;
