import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useFirebase, OutputDevice } from "@/context/FirebaseContext";

interface ControlPanelProps {
  deviceId: OutputDevice;
}

const ControlButton: React.FC<ControlPanelProps> = ({ deviceId }) => {
  const { deviceDetails, changeFlag } = useFirebase();
  const details = deviceDetails[deviceId];

  const scale = useSharedValue(1);
  const flag = details?.flag ?? 0;

  const isSolenoid = deviceId === "s1" || deviceId === "s2";

  const toggleFlag = () => {
    if (!details) return;

    const otherDeviceId =
      deviceId === "s1" ? "s2" : deviceId === "s2" ? "s1" : null;
    const otherDevice = otherDeviceId ? deviceDetails[otherDeviceId] : null;

    if (isSolenoid && details.flag === 1 && otherDevice?.flag === 0) {
      alert("At least one pipe must remain ON.");
      return;
    }

    changeFlag(deviceId, details.flag === 1 ? 0 : 1, null, null);
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
      className={`w-[49%] p-4 rounded-3xl ${
        flag === 1 ? "bg-green-500" : "bg-gray-400"
      }`}
    >
      <Animated.View
        style={animatedStyle}
        className="flex items-center justify-center"
      >
        {isSolenoid ? (
          <MaterialCommunityIcons name="pipe" size={32} color="white" />
        ) : (
          <Ionicons
            name={flag === 1 ? "bulb" : "bulb-outline"}
            size={32}
            color="white"
          />
        )}
        <Text className="text-white text-lg font-bold mt-1">
          {flag === 1 ? "ON" : "OFF"}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ControlButton;
