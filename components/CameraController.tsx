import { View, Text, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePartition2 } from "@/hooks/usePartition";

const CameraController = () => {
  const { actuatorStatus, changeStatus } = usePartition2();
  const camera = Object.values(actuatorStatus).find(
    (actuator) => actuator?.id === "pi"
  );

  const isOn = camera?.status === 1;
  const [showDelayMsg, setShowDelayMsg] = useState(false);

  const handleToggle = () => {
    if (!camera?.id) return;

    if (!isOn) {
      Alert.alert(
        "Activate Camera",
        "Streaming may consume high data. Do you want to continue?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Activate",
            onPress: () => {
              changeStatus(camera.id, 1);
              setShowDelayMsg(true);
              setTimeout(() => setShowDelayMsg(false), 10000);
            },
            style: "default",
          },
        ]
      );
    } else {
      Alert.alert(
        "Deactivate Camera",
        "Are you sure you want to turn off the camera?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Turn Off",
            onPress: () => changeStatus(camera.id, 0),
            style: "destructive",
          },
        ]
      );
    }
  };

  return (
    <View className="w-full aspect-[5/2] bg-white rounded-2xl px-5 py-4 flex-row items-center justify-between shadow shadow-blue-400">
      {/* Left: Icon and Status */}
      <View className="flex-row items-center gap-4">
        <View
          className={`p-3 rounded-full ${
            isOn ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <MaterialCommunityIcons
            name={isOn ? "cctv" : "cctv-off"}
            size={36}
            color="white"
          />
        </View>

        <View className="justify-center">
          <Text className="text-gray-800 text-base font-semibold">
            Surveillance
          </Text>
          <Text
            className={`text-xl font-bold ${
              isOn ? "text-green-600" : "text-gray-500"
            }`}
          >
            {isOn ? "Active" : "Inactive"}
          </Text>
        </View>
      </View>

      {/* Right: Toggle Button */}
      <View className="items-end">
        <Pressable
          onPress={handleToggle}
          className={`px-4 py-2 rounded-full ${
            isOn ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <Text className="text-white font-semibold text-sm">
            {isOn ? "Turn Off" : "Turn On"}
          </Text>
        </Pressable>
        {isOn && (
          <Text className="text-xs text-gray-600 mt-2  max-w-[150px] text-justify">
            Streaming may take a few miniutes to start after turning on the
            camera.
          </Text>
        )}
      </View>
    </View>
  );
};

export default CameraController;
