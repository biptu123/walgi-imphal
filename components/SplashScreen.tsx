import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import splashAnimation from "@/assets/animations/splash.json";
import Animated, { FadeOut, ZoomIn } from "react-native-reanimated";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const SplashScreen = ({
  onAnimationFinish = (isCancelled) => {},
}: {
  onAnimationFinish: (isCancelled: boolean) => void;
}) => {
  return (
    <Animated.View
      exiting={FadeOut.duration(300)}
      className="flex-1 justify-center items-center"
    >
      <AnimatedLottieView
        exiting={ZoomIn.duration(300)}
        autoPlay
        style={{
          width: 350,
          height: 350,
        }}
        source={splashAnimation}
        loop={false}
        onAnimationFinish={onAnimationFinish}
      />
    </Animated.View>
  );
};

export default SplashScreen;
