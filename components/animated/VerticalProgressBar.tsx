import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

type Props = {
  steps: number;
  step: number;
  delay?: number; // optional, in ms
  barColor?: string; // optional
};

const VerticalProgressBar = ({
  steps,
  step,
  delay = 0,
  barColor = "#7D95E2",
}: Props) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    const clampedStep = Math.min(Math.max(step, 0), steps);

    if (clampedStep === 0) {
      // If the step is 0, reset progress without animation
      progress.value = 0;
      return;
    }

    const startAnimation = () => {
      progress.value = withTiming(clampedStep / steps, { duration: 400 });
    };

    const timer = setTimeout(() => {
      runOnJS(startAnimation)();
    }, delay);

    return () => clearTimeout(timer);
  }, [step, steps, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: progress.value }],
    };
  });

  return (
    <View className="w-full h-full justify-center items-center">
      <View className="w-full h-full bg-gray-200 overflow-hidden">
        <Animated.View
          style={[
            {
              backgroundColor: barColor,
              width: "100%",
              height: "100%",
              transformOrigin: "bottom center",
            },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
};

export default VerticalProgressBar;
