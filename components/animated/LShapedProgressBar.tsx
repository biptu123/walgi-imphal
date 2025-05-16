import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  steps: number;
  step: number;
  barColor?: string;
  durationPerStep?: number;
  barWidth?: number;
  backgroundH?: string;
  backgroundV?: string;
};

const LShapedProgressBar = ({
  steps,
  step,
  barColor = "#526dc790",
  durationPerStep = 400,
  barWidth = 10,
  backgroundH = "none",
  backgroundV = "none",
}: Props) => {
  const horizontalProgress = useSharedValue(0);
  const verticalProgress = useSharedValue(0);
  const prevStep = useRef(0);

  useEffect(() => {
    const clampedStep = Math.min(Math.max(step, 0), steps);
    const targetProgress = clampedStep / steps;
    const stepDiff = Math.abs(clampedStep - prevStep.current);
    const totalDuration = stepDiff * durationPerStep;
    const halfDuration = totalDuration / 2;

    const isReverse = clampedStep < prevStep.current;

    if (isReverse) {
      // Reverse: animate vertical first → then horizontal
      verticalProgress.value = withTiming(
        targetProgress,
        { duration: halfDuration },
        (finished) => {
          if (finished) {
            horizontalProgress.value = withTiming(targetProgress, {
              duration: halfDuration,
            });
          }
        }
      );
    } else {
      // Forward: animate horizontal first → then vertical
      horizontalProgress.value = withTiming(
        targetProgress,
        { duration: halfDuration },
        (finished) => {
          if (finished) {
            verticalProgress.value = withTiming(targetProgress, {
              duration: halfDuration,
            });
          }
        }
      );
    }

    prevStep.current = clampedStep;
  }, [step, steps, durationPerStep]);

  const horizontalStyle = useAnimatedStyle(() => ({
    width: `${horizontalProgress.value * 100}%`,
  }));

  const verticalStyle = useAnimatedStyle(() => ({
    height: `${verticalProgress.value * 100}%`,
  }));

  return (
    <View className="w-full h-full">
      {/* Horizontal progress (bottom row) */}
      <View
        className={clsx(
          "absolute bottom-0 left-0 w-full overflow-hidden rounded-br-full"
        )}
        style={{ height: barWidth, backgroundColor: backgroundH }}
      >
        <Animated.View
          className="h-full rounded-br-full"
          style={[{ backgroundColor: barColor }, horizontalStyle]}
        />
      </View>

      {/* Vertical progress (right column) */}
      <View
        className={clsx("absolute right-0 overflow-hidden rounded-t-full")}
        style={{
          width: barWidth,
          bottom: barWidth,
          height: "100%",
          backgroundColor: backgroundV,
        }}
      >
        <Animated.View
          className="w-full absolute bottom-0 rounded-t-full"
          style={[{ backgroundColor: barColor }, verticalStyle]}
        />
      </View>
    </View>
  );
};

export default LShapedProgressBar;
