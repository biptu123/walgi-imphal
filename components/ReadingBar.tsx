import { View } from "react-native";
import React, { useEffect, useCallback } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native"; // Helps reanimate on tab switch

const getColor = (
  value: number,
  type: "temperature" | "humidity" | "moisture"
) => {
  if (type === "temperature")
    return value > 35
      ? "bg-red-500"
      : value > 25
      ? "bg-yellow-500"
      : "bg-green-500";
  if (type === "humidity")
    return value < 30
      ? "bg-red-500"
      : value > 70
      ? "bg-yellow-500"
      : "bg-blue-500";
  if (type === "moisture")
    return value < 50
      ? "bg-red-500"
      : value > 80
      ? "bg-yellow-500"
      : "bg-green-500";
  return "bg-gray-400";
};

const ReadingBar = ({
  value,
  type,
}: {
  value: number;
  type: "temperature" | "humidity" | "moisture";
}) => {
  const width = useSharedValue(0); // Start from 0%

  const animate = () => {
    width.value = 0; // Reset animation before playing
    width.value = withTiming(Math.min(value, 100), { duration: 1000 });
  };

  useEffect(() => {
    animate();
  }, [value]);

  useFocusEffect(
    useCallback(() => {
      animate(); // Re-trigger animation when the tab is revisited
    }, [])
  );

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View className="w-full h-2 bg-gray-300 rounded-full overflow-hidden mt-2">
      <Animated.View
        style={animatedStyle}
        className={`h-full ${getColor(value, type)}`}
      />
    </View>
  );
};

export default ReadingBar;
