import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getReading, Reading, stopReadingListener } from "@/lib/firebase";
import ReadingCard from "@/components/ReadingCard";

const Home = () => {
  const [readings, setReadings] = useState<Reading[] | null>(null);

  useEffect(() => {
    const unsubscribe = getReading(setReadings); // Store unsubscribe function
    return () => stopReadingListener(); // Cleanup on unmount
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <StatusBar barStyle="dark-content" className="bg-gray-200" />

      {readings === null ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          data={readings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReadingCard item={item} />}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
