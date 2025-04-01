import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  changeFlag,
  DeviceDetails,
  getDetails,
  OutputDevice,
  stopDetailsListener,
} from "@/lib/firebase";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

interface ControlPanelProps {
  deviceId: OutputDevice;
}

const ControlButton: React.FC<ControlPanelProps> = ({ deviceId }) => {
  const [details, setDetails] = useState<DeviceDetails | null>(null);
  const scale = useSharedValue(1);

  useEffect(() => {
    getDetails(deviceId, setDetails);
    return () => stopDetailsListener(deviceId);
  }, [deviceId]);

  const flag = details?.flag ?? 0; // Ensure `flag` is always defined

  const toggleFlag = () => {
    changeFlag(deviceId, flag === 1 ? 0 : 1, null, null);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity
      onPress={() => {
        scale.value = withSpring(0.9, { damping: 5, stiffness: 150 });
        toggleFlag();
        setTimeout(() => {
          scale.value = withSpring(1);
        }, 100);
      }}
      className={`w-[150] p-4 rounded-full ${
        flag === 1 ? "bg-green-500" : "bg-gray-400"
      }`}
    >
      <Animated.View
        style={animatedStyle}
        className="flex items-center justify-center"
      >
        <Ionicons
          name={flag === 1 ? "bulb" : "bulb-outline"} // ✅ Fixed icon names
          size={32}
          color="white"
        />
        <Text className="text-white text-lg font-bold mt-1">
          {flag === 1 ? "ON" : "OFF"}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ControlButton;
