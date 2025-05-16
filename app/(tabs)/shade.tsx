import {
  View,
  Text,
  Pressable,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { usePartition1 } from "@/hooks/usePartition";
import VideoStream from "@/components/VideoStream";

const TriangleButton = ({
  direction = "up",
  onPressIn,
  onPressOut,
  color = "#000000",
  size = 100,
}: any) => {
  const upPath = `M 15 70 Q 0 70 9 58 L 43 20 Q 50 12 57 20 L 91 58 Q 100 70 85 70 L 15 70 Z`;
  const downPath = `M 15 0 Q 0 0 9 12 L 43 50 Q 50 58 57 50 L 91 12 Q 100 0 85 0 L 15 0 Z`;

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      className="w-full h-[48%] items-center justify-center"
    >
      <Svg width={size} height={size * 0.7} viewBox="0 0 100 70">
        <Path d={direction === "up" ? upPath : downPath} fill={color} />
      </Svg>
    </Pressable>
  );
};

const Shade = () => {
  const size = 150;
  const { actuatorStatus, changeStatus } = usePartition1();
  const shadeControllers = Object.values(actuatorStatus)?.filter((status) =>
    status?.id?.startsWith("s")
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

        {shadeControllers &&
          shadeControllers?.map((controller) => (
            <View
              className="flex-row justify-between items-center gap-x-6"
              key={controller?.id}
            >
              {/* Stop Button */}
              <View
                style={{ width: size, height: size * 1.2 }}
                className={`${
                  controller?.status === 0 ? "bg-red-300" : "bg-red-500"
                } rounded-2xl justify-center items-center`}
              >
                <Pressable
                  onPress={() => changeStatus(controller?.id!, 0)}
                  disabled={controller?.status === 0}
                  className="w-full h-full justify-center items-center"
                >
                  <Text className="text-white text-3xl font-[Helvetica-Bold]">
                    STOP
                  </Text>
                </Pressable>
              </View>

              {/* Controll button */}

              <View
                style={{ width: size, height: size * 1.8 }}
                className="justify-between items-center"
              >
                <TriangleButton
                  direction="up"
                  size={size}
                  color={controller?.status === 1 ? "green" : "#3f3f3f"}
                  onPressIn={() => changeStatus(controller?.id!, 1)}
                  onPressOut={() => changeStatus(controller?.id!, 0)}
                />
                <TriangleButton
                  direction="down"
                  size={size}
                  color={controller?.status === -1 ? "green" : "#3f3f3f"}
                  onPressIn={() => changeStatus(controller?.id!, -1)}
                  onPressOut={() => changeStatus(controller?.id!, 0)}
                />
              </View>
            </View>
          ))}

        <View className="h-[150px]"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Shade;
