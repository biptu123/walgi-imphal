import { View, Text } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { usePartition2 } from "@/hooks/usePartition";

// Tailwind color classes for consistency (cycled by ID)

const COLORS = ["blue", "yellow", "red", "purple"];

const SoilmoistureReadings = () => {
  const { sensorReadings } = usePartition2();

  return (
    <View className="w-full h-full bg-white/90 rounded-2xl p-3 items-center justify-evenly shadow shadow-green-400">
      <View className="w-auto items-center mb-3">
        <View className="bg-green-300 p-3 rounded-full mb-2">
          <FontAwesome5 name="seedling" size={36} color="white" />
        </View>
        <Text className="text-green-700 text-base font-semibold">
          Soil Moisture
        </Text>
      </View>

      {/* Badges container */}
      <View className="justify-evenly gap-2">
        {sensorReadings?.map((item, index) => {
          const colorClass = COLORS[index % COLORS.length];

          return (
            <View
              key={item.id}
              className={`px-10 py-2 rounded-2xl bg-${colorClass}-200/50 flex-row items-center `}
            >
              <Text className={`text-3xl font-medium text-${colorClass}-800`}>
                {item.value !== undefined ? `${item.value}%` : "--"}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default SoilmoistureReadings;
