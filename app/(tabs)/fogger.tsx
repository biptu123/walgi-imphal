import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { usePartition1 } from "@/hooks/usePartition";
import { ActuatorStatus, Partition1Actuator } from "@/types/actuators";
import clsx from "clsx";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import LShapedProgressBar from "@/components/animated/LShapedProgressBar";
import VideoStream from "@/components/VideoStream";

const fogger = () => {
  const { actuatorStatus, changeStatus } = usePartition1();
  const fogControllers = Object.values(actuatorStatus).filter(
    (actuator): actuator is ActuatorStatus<Partition1Actuator> =>
      actuator != null && actuator.id?.startsWith("f")
  );

  const maxIndex = fogControllers.reduce((acc, curr, index) => {
    if (curr.status === 1) {
      return Math.max(index, acc);
    }
    return acc;
  }, -1);

  return (
    <SafeAreaView className="flex-1 bg-[#a89b93]">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ScrollView className="flex-1 pt-[3rem] px-6 ">
        <VideoStream />
        <View className="mt-10 mb-10">
          <View className="h-[40vh] w-full bg-white rounded-2xl pb-5 shadow-sm justify-center">
            <View className="relative h-[90%]">
              <View className="h-full absolute left-0 w-[20%]">
                <LShapedProgressBar
                  steps={1}
                  step={fogControllers.at(0)?.status || 0}
                  backgroundV="#7a7a7a3a"
                />
              </View>
              <View className="h-full absolute left-0 w-[40%]">
                <LShapedProgressBar
                  steps={1}
                  step={fogControllers.at(1)?.status || 0}
                  backgroundV="#7a7a7a3a"
                />
              </View>
              <View className="h-full absolute left-0 w-[60%]">
                <LShapedProgressBar
                  steps={1}
                  step={fogControllers.at(2)?.status || 0}
                  backgroundV="#7a7a7a3a"
                />
              </View>
              <View className="h-full absolute left-0 w-[80%]">
                <LShapedProgressBar
                  steps={1}
                  step={fogControllers.at(3)?.status || 0}
                  backgroundV="#7a7a7a3a"
                  backgroundH="#7a7a7a3a"
                />
              </View>
            </View>
          </View>
        </View>

        <View className="w-full items-center bg-white py-5 rounded-2xl shadow-sm">
          <View className="w-[80%] flex-row justify-around">
            {fogControllers.map((controller, i) => {
              const rotate = useSharedValue(0);

              useEffect(() => {
                rotate.value = withTiming(controller.status ? 180 : 0, {
                  duration: 300,
                });
              }, [controller.status]);

              const animatedStyle = useAnimatedStyle(() => {
                return {
                  transform: [{ rotate: `${rotate.value}deg` }],
                };
              });

              return (
                <Pressable
                  key={controller.id}
                  className={clsx(
                    "w-16 aspect-square rounded-2xl items-center justify-center",
                    {
                      "bg-[#d1fae5]": controller.status, // mint green (active)
                      "bg-[#e5e7eb]": !controller.status, // gray-200 (inactive)
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
                      color={controller.status ? "#10b981" : "#6b7280"} // emerald vs gray-500
                    />
                  </Animated.View>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View className="h-[150px]"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default fogger;
