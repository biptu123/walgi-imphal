import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ReadingBar from "./ReadingBar";
import { Reading } from "@/context/FirebaseContext";

const ReadingCard = ({ item }: { item: Reading }) => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const pressScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value * pressScale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    pressScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1);
  };

  // Animate on first mount and whenever the `item` changes
  useEffect(() => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    opacity.value = withTiming(1, { duration: 600 });
  }, [item]);

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="w-[95%] my-3 mx-auto"
    >
      <Animated.View
        style={animatedStyle}
        className="p-4 rounded-3xl shadow-lg border border-gray-200 bg-white"
      >
        <Text className="text-xl text-gray-800 font-[Helvetica-Bold] text-center mb-2">
          DEVICE: {item.id}
        </Text>

        {/* Temperature Section */}
        <View className="mb-1">
          <Text className="text-lg font-[Helvetica-Bold] text-gray-700">
            🌡 Temperature: {item.t}°C
          </Text>
          <ReadingBar value={item.t} type="temperature" />
        </View>

        {/* Humidity Section */}
        <View className="mb-1">
          <Text className="text-lg font-[Helvetica-Bold] text-gray-700">
            💧 Humidity: {item.h}%
          </Text>
          <ReadingBar value={item.h} type="humidity" />
        </View>

        {/* Moisture Section */}
        <View>
          <Text className="text-lg font-[Helvetica-Bold] text-gray-700">
            🌱 Soil Moisture: {item.s}%
          </Text>
          <ReadingBar value={item.s} type="moisture" />
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default ReadingCard;
