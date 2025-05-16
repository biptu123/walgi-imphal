import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import LShapedProgressBar from "@/components/animated/LShapedProgressBar";
import { ActuatorStatus, Partition3Actuator } from "@/types/actuators";
import { usePartition3 } from "@/hooks/usePartition";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { clsx } from "clsx";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { useDripGroups } from "@/hooks/useDripGroups";
import DripGroupController from "@/components/DripGroupController";
import VideoStream from "@/components/VideoStream";
import { useFocusEffect } from "expo-router";

const drip = () => {
  const { actuatorStatus, changeStatus } = usePartition3();
  const dripControllers = Object.values(actuatorStatus).filter(
    (actuator): actuator is ActuatorStatus<Partition3Actuator> =>
      actuator != null && actuator.id?.startsWith("d")
  );
  const { groups, refreshGroups } = useDripGroups();

  const [showDrawer, setShowDrawer] = useState(false);
  const drawerHeight = 500;
  const drawerTranslateY = useSharedValue(drawerHeight);

  useFocusEffect(
    useCallback(() => {
      refreshGroups();
    }, [])
  );

  useEffect(() => {
    drawerTranslateY.value = withTiming(showDrawer ? 0 : drawerHeight, {
      duration: 400,
    });
  }, [showDrawer]);

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: drawerTranslateY.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-[#a89b93]">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ScrollView className="flex-1 pt-[3rem] px-6">
        <VideoStream />

        {/* Top Progress View */}
        <View className="mt-10">
          <View className="h-[40vh] w-full bg-white rounded-2xl pb-5 shadow-sm justify-center relative z-10">
            <View className="relative h-[90%]">
              {dripControllers.map((controller, index) => (
                <View
                  className="h-full absolute left-0"
                  key={controller.id}
                  style={{ width: `${6.3 * (index + 1)}%` }}
                >
                  {index === dripControllers.length - 1 ? (
                    <LShapedProgressBar
                      steps={1}
                      barWidth={5}
                      step={controller?.status || 0}
                      backgroundV="#7a7a7a3a"
                      backgroundH="#7a7a7a3a"
                    />
                  ) : (
                    <LShapedProgressBar
                      steps={1}
                      barWidth={5}
                      step={controller?.status || 0}
                      backgroundV="#7a7a7a3a"
                    />
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
        {/* Toggle Drawer Button */}
        <View className="items-center mb-6 z-10">
          <Pressable
            className="bg-[#4b5563] px-6 py-2 rounded-b-full w-[150px] "
            onPress={() => setShowDrawer((prev) => !prev)}
          >
            <Text className="text-white font-semibold text-center">
              {showDrawer ? "Hide Controls" : "Show Controls"}
            </Text>
          </Pressable>
        </View>

        <View className="w-full  bg-white rounded-2xl flex-row p-4 gap-4">
          {Object.entries(groups)
            ?.sort()
            ?.map(([groupName, drippers]) => (
              <View key={groupName} className="flex-1">
                <DripGroupController
                  drippers={drippers}
                  name={groupName}
                  dripControllers={dripControllers}
                />
              </View>
            ))}
        </View>

        <View className="h-[150px]" />
      </ScrollView>

      {/* Controller Drawer */}
      <Animated.View
        style={drawerStyle}
        className="absolute bottom-0  bg-[#645d5d] rounded-t-2xl pt-4 pb-[100px] w-[90%] left-[5%]"
      >
        <View className=" absolute top-0 -translate-y-full flex items-center w-full justify-center">
          <Pressable
            onPress={() => setShowDrawer((prev) => !prev)}
            className="bg-[#4b5563] px-6 py-2 rounded-t-full w-[150px]"
          >
            <Text className="text-white font-semibold text-center">
              {showDrawer ? "Hide Controls" : "Show Controls"}
            </Text>
          </Pressable>
        </View>

        <View className="flex-row flex-wrap justify-center gap-4">
          {dripControllers.map((controller, i) => {
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
                  "w-16 h-16 rounded-2xl items-center justify-center",
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
            );
          })}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default drip;
