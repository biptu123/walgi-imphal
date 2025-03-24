import { View, Text, Pressable } from "react-native";
import React, { useEffect, useCallback } from "react";
import { Reading } from "@/lib/firebase";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ReadingBar from "./ReadingBar";
import { useFocusEffect } from "@react-navigation/native"; // Ensures animation on tab revisit

const ReadingCard = ({ item }: { item: Reading }) => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  const animate = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    opacity.value = withTiming(1, { duration: 600 });
  };

  useEffect(() => {
    animate();
  }, []);

  useFocusEffect(
    useCallback(() => {
      animate();
    }, [])
  );

  const pressScale = useSharedValue(1);
  const handlePressIn = () => (pressScale.value = withSpring(0.95));
  const handlePressOut = () => (pressScale.value = withSpring(1));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { scale: pressScale.value }],
    opacity: opacity.value,
  }));

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="w-[98%] my-3 mx-1"
    >
      <Animated.View
        style={animatedStyle}
        className="p-4 bg-white rounded-3xl shadow-lg border border-gray-200"
      >
        <Text className="text-xl text-gray-700 font-[JosefinSans-Bold] text-center mb-2">
          DEVICE: {item.id}
        </Text>

        {/* Temperature Section */}
        <View className="mb-3">
          <Text className="text-lg font-[JosefinSans-SemiBold] text-gray-800">
            🌡 Temperature: {item.t}°C
          </Text>
          <ReadingBar value={item.t} type="temperature" />
        </View>

        {/* Humidity Section */}
        <View className="mb-3">
          <Text className="text-lg font-[JosefinSans-SemiBold] text-gray-800">
            💧 Humidity: {item.h}%
          </Text>
          <ReadingBar value={item.h} type="humidity" />
        </View>

        {/* Moisture Section */}
        <View>
          <Text className="text-lg font-[JosefinSans-SemiBold] text-gray-800">
            🌱 Soil Moisture: {item.s}%
          </Text>
          <ReadingBar value={item.s} type="moisture" />
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default ReadingCard;
