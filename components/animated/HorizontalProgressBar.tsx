import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  steps: number;
  step: number;
  barColor?: string; // Optional color prop
  durationPerStep?: number; // Optional ms per step (default 400)
};

const HorizontalProgressBar = ({
  steps,
  step,
  barColor = "#7D95E2",
  durationPerStep = 400,
}: Props) => {
  const progress = useSharedValue(0);

  // Animate when step changes
  useEffect(() => {
    const clampedStep = Math.min(Math.max(step, 0), steps);
    const duration = clampedStep * durationPerStep;

    // Adjust the shared value for both forward and backward animation
    progress.value = withTiming(clampedStep / steps, { duration });
  }, [step, steps, durationPerStep]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleX: progress.value }],
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
              transformOrigin: "left center",
            },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
};

export default HorizontalProgressBar;
