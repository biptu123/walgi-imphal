import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

// Skeleton box with shimmer animation
const SkeletonBox = ({ className = "" }) => {
  const opacity = useSharedValue(0.3);

  // Animate opacity back and forth
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  React.useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  return (
    <Animated.View
      style={[animatedStyle]}
      className={`rounded-xl bg-gray-300/40 ${className}`}
    />
  );
};

const ReadingSkeleton = () => {
  return (
    <ScrollView className="p-4">
      {[...Array(6)].map((_, index) => (
        <View
          key={index}
          className="bg-[#4f4c4c] p-4 mb-4 rounded-3xl shadow-md border border-gray-200"
        >
          <SkeletonBox className="mb-4 self-center w-[60%] h-[20px]" />

          <SkeletonBox className="mb-2 w-[80%] h-[18px]" />
          <SkeletonBox className="mb-4 w-[100%] h-[10px]" />

          <SkeletonBox className="mb-2 w-[80%] h-[18px]" />
          <SkeletonBox className="mb-4 w-[100%] h-[10px]" />

          <SkeletonBox className="mb-2 w-[80%] h-[18px]" />
          <SkeletonBox className="w-[100%] h-[10px]" />
        </View>
      ))}
    </ScrollView>
  );
};

export default ReadingSkeleton;
