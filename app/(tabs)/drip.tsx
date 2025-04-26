import React from "react";
import ControlPanel from "@/components/ControlPanel";
import { ScrollView, View } from "react-native";
import ControlButton from "@/components/ControlButton";

const Drip = () => {
  return (
    <View className="flex bg-gray-200 py-16 min-h-full gap-4">
      <ScrollView>
        <ControlPanel deviceId="d" title="DRIP FIELD CONTROL" />

        <View className="flex-row w-full justify-evenly mt-5  px-6">
          <ControlButton deviceId="s1" />
          <ControlButton deviceId="s2" />
        </View>
        <View className="flex-row w-full justify-evenly mt-5  px-6">
          <ControlButton deviceId="l3" />
          <ControlButton deviceId="l4" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Drip;
