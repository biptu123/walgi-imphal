import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import selcoLogo from "@/assets/images/splash.png";
import walgiLogo from "@/assets/images/logo.png";

const About = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 60,
        }}
      >
        {/* Heading */}
        <Text className="text-3xl font-[Helvetica-ExtraBold] mb-4 text-gray-600 text-center">
          ABOUT US
        </Text>

        {/* SELCO Logo */}
        <Image
          source={selcoLogo}
          className="w-36 h-36 self-center mb-6 rounded-xl"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
          }}
        />

        {/* Description */}
        <Text
          className="text-[16px] text-gray-700 mb-6 leading-6 font-helvetica"
          style={{ textAlign: "justify" }}
        >
          This IoT-based Smart Irrigation System, implemented in{" "}
          <Text className="font-semibold text-gray-800 font-helvetica-bold">
            Kharupetia, Assam
          </Text>
          , is a pioneering initiative conceptualised and funded by the{" "}
          <Text className="font-semibold text-gray-800 font-helvetica-bold">
            SELCO Foundation
          </Text>
          . It integrates cutting-edge technology with sustainable agriculture
          practices to enhance water efficiency and crop productivity through
          solar-powered smart drip and sprinkler solutions.
        </Text>

        {/* Divider */}
        <View className="h-[1px] bg-gray-300 opacity-50 my-8" />

        {/* Walgi Logo */}
        <Image
          source={walgiLogo}
          className="w-20 h-6 self-center mb-4"
          resizeMode="contain"
        />

        {/* Walgi Description */}
        <Text
          className="text-[16px] text-gray-700 leading-6 font-helvetica"
          style={{ textAlign: "justify" }}
        >
          The system has been designed and developed by{" "}
          <Text className="font-semibold text-gray-800 font-helvetica-bold">
            Walgi Private Limited
          </Text>
          . For technical assistance or support, please feel free to contact our
          team at{" "}
          <Text className="font-semibold text-blue-600 font-helvetica-bold">
            +91 70026 09097
          </Text>
          .
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
