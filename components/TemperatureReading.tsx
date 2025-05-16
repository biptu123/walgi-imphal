import { View, Text } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { usePartition1 } from "@/hooks/usePartition";

const TemperatureReading = () => {
  const { sensorReadings } = usePartition1();
  const temperature = sensorReadings?.find((reading) => reading.id === "t");

  return (
    <View className="w-full aspect-square bg-white/80 rounded-2xl p-3 items-center justify-center shadow shadow-red-400">
      <View className="bg-red-300 p-3 rounded-full mb-2">
        <FontAwesome5 name="temperature-high" size={36} color="white" />
      </View>
      <Text className="text-red-700 text-base font-semibold mb-1">
        Temperature
      </Text>
      <Text className="text-red-800 text-3xl font-bold">
        {temperature?.value !== undefined ? `${temperature.value}°C` : "--"}
      </Text>
    </View>
  );
};

export default TemperatureReading;
