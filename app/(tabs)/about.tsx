import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import walgiLogo from "@/assets/images/logo.png";

const About = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#a89b93]">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ScrollView className="flex-1 pt-[23rem] px-6">
        {/* Walgi Logo */}
        <Image
          source={walgiLogo}
          className="w-20 h-6 self-center mb-4"
          resizeMode="contain"
        />

        {/* Walgi Description */}
        <Text
          className="text-[16px] text-white leading-6 font-helvetica"
          style={{ textAlign: "justify" }}
        >
          The system has been designed and developed by{" "}
          <Text className="font-semibold text-green-800 font-helvetica-bold">
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
