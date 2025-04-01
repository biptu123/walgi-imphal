import React from "react";
import ControlPanel from "@/components/ControlPanel";
import { ScrollView, View } from "react-native";
import ControlButton from "@/components/ControlButton";

const Drip = () => {
  return (
    <View className="flex bg-gray-200 py-16 min-h-full">
      <ScrollView>
        <ControlPanel deviceId="d" title="DRIPPING CONTROL" />
        <View className="flex-row w-full justify-evenly mt-5">
          <ControlButton deviceId="l3" />
          <ControlButton deviceId="l4" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Drip;
