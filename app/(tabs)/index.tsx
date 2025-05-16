import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import polyhouseImage from "@/assets/images/polyhouse.png";
import waveImage from "@/assets/images/wave.png";
import WeatherCard from "@/components/WeatherCard";
import SoilmoistureReadings from "@/components/SoilmoistureReadings";
import TemperatureReading from "@/components/TemperatureReading";
import HumidityReading from "@/components/HumidityReading";
import CameraController from "@/components/CameraController";

export default function IndexScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#a89b93]">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Header background layer (absolute) */}
      <View className="absolute top-0 left-0 w-full">
        {/* Wave image */}
        <Image
          source={waveImage}
          className="w-full scale-x-[-1] h-64"
          resizeMode="stretch"
        />
        {/* Text section */}
        <View className="mx-6 -mt-20">
          <Text className="text-white text-3xl font-helvetica-extraBold">
            Hello Farmer
          </Text>
          <Text className="text-white text-3xl font-helvetica-extraBold">
            Welcome Home
          </Text>
        </View>
        {/* Polyhouse image */}
        <Image
          source={polyhouseImage}
          className="w-[250px] aspect-[3/2] scale-x-[-1] absolute right-6 top-7"
          resizeMode="contain"
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView className="flex-1 px-6 pt-[23rem]">
        <WeatherCard />
        <View className="w-full flex-row justify-between gap-5 my-5 aspect-square">
          <View className="flex-1">
            <SoilmoistureReadings />
          </View>
          <View className="flex-1 gap-5">
            <TemperatureReading />
            <HumidityReading />
          </View>
        </View>
        <CameraController />
        <View className="h-[450px]"></View>
      </ScrollView>
    </SafeAreaView>
  );
}
