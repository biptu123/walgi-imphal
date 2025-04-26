import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFirebase } from "@/context/FirebaseContext";
import ReadingCard from "@/components/ReadingCard";
import ReadingSkeleton from "@/components/ReadingSkeleton";
import WeatherCard from "@/components/WeatherCard";

const Home = () => {
  const [greeting, setGreeting] = useState(getGreeting());
  const { readings } = useFirebase();
  // console.log(readings);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 1000 * 60); // Update every minute

    return () => clearInterval(interval); // Cleanup
  }, []);

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <StatusBar barStyle="dark-content" className="bg-gray-200" />
      {/* Greeting */}
      <View className="w-full flex flex-row justify-center gap-2 mt-7">
        <Text className="text-3xl font-helvetica-bold">{greeting}</Text>
        <Text className="text-3xl font-helvetica-extraBold color-[#D80D73]">
          HABIBAR!
        </Text>
      </View>

      {readings.length === 0 ? (
        <ReadingSkeleton />
      ) : (
        <FlatList
          data={readings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ReadingCard item={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={<WeatherCard />}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Morning";
  } else if (hour < 18) {
    return "Afternoon";
  } else {
    return "Evening";
  }
};
