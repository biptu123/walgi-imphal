import { View, Text } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { usePartition1 } from "@/hooks/usePartition";

const HumidityReading = () => {
  const { sensorReadings } = usePartition1();
  const humidity = sensorReadings?.find((reading) => reading.id === "h");

  return (
    <View className="w-full aspect-square bg-white/90 rounded-2xl p-3 items-center justify-center shadow shadow-blue-400">
      <View className="bg-blue-300 p-3 rounded-full mb-2 aspect-square items-center">
        <FontAwesome5 name="tint" size={36} color="white" />
      </View>
      <Text className="text-blue-700 text-base font-semibold mb-1">
        Humidity
      </Text>
      <Text className="text-blue-800 text-3xl font-bold">
        {humidity?.value !== undefined ? `${humidity.value}%` : "--"}
      </Text>
    </View>
  );
};

export default HumidityReading;
