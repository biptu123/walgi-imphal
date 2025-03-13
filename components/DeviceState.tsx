import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Svg, { Circle, Path } from "react-native-svg";

const SprinklerOn = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Svg width={100} height={100} viewBox="0 0 100 100">
        <Path d="M50 10 L40 40 L60 40 Z" fill="blue" />
        <Circle cx="50" cy="60" r="8" fill="gray" />
      </Svg>
    </Animated.View>
  );
};

const SprinklerOff = () => (
  <Svg width={100} height={100} viewBox="0 0 100 100">
    <Path d="M50 10 L40 40 L60 40 Z" fill="gray" />
    <Circle cx="50" cy="60" r="8" fill="darkgray" />
  </Svg>
);

const DripOn = () => {
  const dropPosition = useSharedValue(0);

  useEffect(() => {
    dropPosition.value = withRepeat(
      withSequence(
        withTiming(50, { duration: 800, easing: Easing.ease }),
        withTiming(0, { duration: 0 })
      ),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: dropPosition.value }],
  }));

  return (
    <View>
      <Svg width={100} height={100} viewBox="0 0 100 100">
        <Path d="M50 10 L50 40" stroke="blue" strokeWidth={5} />
      </Svg>
      <Animated.View style={animatedStyle}>
        <Svg width={20} height={30} viewBox="0 0 20 30">
          <Path d="M10 0 Q20 15, 10 30 Q0 15, 10 0 Z" fill="blue" />
        </Svg>
      </Animated.View>
    </View>
  );
};

const DripOff = () => (
  <Svg width={100} height={100} viewBox="0 0 100 100">
    <Path d="M50 10 L50 40" stroke="gray" strokeWidth={5} />
  </Svg>
);

export { SprinklerOn, SprinklerOff, DripOn, DripOff };
