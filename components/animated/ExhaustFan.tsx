import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";

type ExhaustFanProps = {
  status: 0 | 1;
};

const ExhaustFan: React.FC<ExhaustFanProps> = ({ status }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (status === 1) {
      rotation.value = withRepeat(
        withTiming(400, {
          easing: Easing.linear,
        }),
        -1,
        false
      );
    } else {
      cancelAnimation(rotation);
      rotation.value = 0;
    }
  }, [status]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.housing}>
      <Animated.View style={[styles.fan, animatedStyle]}>
        {[...Array(3)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.blade,
              {
                transform: [
                  { rotate: `${i * 120}deg` },
                  { translateY: -10 },
                  { translateX: 20 },
                ],
              },
            ]}
          />
        ))}
        <View style={styles.hub} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  housing: {
    width: "100%",
    aspectRatio: 1,
    borderWidth: 4,
    borderColor: "#333",
    borderRadius: 12,
    backgroundColor: "#1f1f1f",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  fan: {
    position: "absolute",
    width: "70%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  blade: {
    position: "absolute",
    width: "50%",
    height: "40%",
    backgroundColor: "#555",
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  hub: {
    width: "50%",
    aspectRatio: 1,
    backgroundColor: "#888",
    borderRadius: 999,
    zIndex: 10,
  },
});

export default ExhaustFan;
