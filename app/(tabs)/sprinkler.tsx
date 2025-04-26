import React from "react";
import ControlPanel from "@/components/ControlPanel";
import { ScrollView, View } from "react-native";
import ControlButton from "@/components/ControlButton";

const Sprinkler = () => {
  return (
    <View className="flex bg-gray-200 py-16 min-h-full gap-4">
      <ScrollView>
        <ControlPanel deviceId="s" title="SPRINKLER CONTROL" />

        <View className="flex-row w-full justify-evenly mt-5  px-6">
          <ControlButton deviceId="l1" />
          <ControlButton deviceId="l2" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Sprinkler;
