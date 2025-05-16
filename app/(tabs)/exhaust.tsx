import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import ExhaustFan from "@/components/animated/ExhaustFan";
import { usePartition1 } from "@/hooks/usePartition";
import { ActuatorStatus, Partition1Actuator } from "@/types/actuators";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import clsx from "clsx";
import { Ionicons } from "@expo/vector-icons";
import VideoStream from "@/components/VideoStream";

const Exhaust = () => {
  const { actuatorStatus, changeStatus } = usePartition1();
  const exhaustControllers = Object.values(actuatorStatus).filter(
    (actuator): actuator is ActuatorStatus<Partition1Actuator> =>
      actuator != null && actuator.id?.startsWith("e")
  );

  return (
    <SafeAreaView className="flex-1 bg-[#a89b93]">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ScrollView className="flex-1 pt-[3rem] px-6">
        <VideoStream />

        <View className="mt-10 flex-row gap-5 h-[500px] ">
          {/* Exhaust Fans Column */}
          <View className="flex-1 bg-white rounded-2xl p-4 justify-evenly gap-4 shadow-sm items-end">
            {exhaustControllers.map((controller) => (
              <View key={controller.id} className="flex-1 aspect-square">
                <ExhaustFan status={controller.status as 0 | 1} />
              </View>
            ))}
          </View>

          {/* Controls Column */}
          <View className="w-[30%] bg-white rounded-2xl items-center">
            {exhaustControllers.map((controller) => {
              const rotate = useSharedValue(0);

              useEffect(() => {
                rotate.value = withTiming(controller.status ? 180 : 0, {
                  duration: 300,
                });
              }, [controller.status]);

              const animatedStyle = useAnimatedStyle(() => ({
                transform: [{ rotate: `${rotate.value}deg` }],
              }));

              return (
                <View
                  className="flex-1 justify-center items-center"
                  key={controller.id}
                >
                  <Pressable
                    className={clsx(
                      "w-16 aspect-square rounded-2xl items-center justify-center mb-2",
                      {
                        "bg-[#d1fae5]": controller.status,
                        "bg-[#e5e7eb]": !controller.status,
                      }
                    )}
                    onPress={() =>
                      changeStatus(controller.id, controller.status ? 0 : 1)
                    }
                  >
                    <Animated.View style={animatedStyle}>
                      <Ionicons
                        name={controller.status ? "power" : "power-outline"}
                        size={30}
                        color={controller.status ? "#10b981" : "#6b7280"}
                      />
                    </Animated.View>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>
        <View className="h-[150px]"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Exhaust;
