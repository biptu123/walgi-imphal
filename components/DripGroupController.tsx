import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { usePartition3 } from "@/hooks/usePartition";
import { ActuatorStatus, Partition3Actuator } from "@/types/actuators";
import { useRouter } from "expo-router";

type DripGroupControllerProps = {
  drippers: string[];
  name: string;
  dripControllers: ActuatorStatus<Partition3Actuator>[];
};

const DripGroupController: React.FC<DripGroupControllerProps> = ({
  drippers,
  name,
  dripControllers,
}) => {
  const { changeStatus } = usePartition3();
  const router = useRouter();

  const isOn = drippers.every((dripper) => {
    const controller = dripControllers.find((dc) => dc.id === dripper);
    return controller?.status === 1;
  });

  const rotation = useSharedValue(isOn ? 180 : 0);

  useEffect(() => {
    rotation.value = withTiming(isOn ? 180 : 0, { duration: 300 });
  }, [isOn]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const handleClick = () => {
    const newStatus = isOn ? 0 : 1;
    drippers.forEach((dripper) => {
      changeStatus(dripper as Partition3Actuator, newStatus);
    });
  };

  const handleOpenModal = () => {
    router.push({
      pathname: "/(modals)/group",
      params: { groupName: name },
    });
  };

  return (
    <Pressable
      onPress={handleClick}
      onLongPress={handleOpenModal}
      className={`w-full aspect-square rounded-2xl items-center justify-center ${
        isOn ? "bg-[#d1fae5]" : "bg-[#e5e7eb]"
      }`}
    >
      <Animated.View style={animatedIconStyle}>
        <Ionicons
          name={isOn ? "power" : "power-outline"}
          size={40}
          color={isOn ? "#10b981" : "#6b7280"}
        />
      </Animated.View>
      <Text
        className="mt-2 font-semibold text-gray-700 text-center"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default DripGroupController;
