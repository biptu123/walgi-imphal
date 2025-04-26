import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();
const WEATHER_KEY = "cachedWeather";
const WEATHER_FETCH_TIME_KEY = "lastWeatherFetch";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in ms

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
  };
}

const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        "http://api.weatherapi.com/v1/current.json?key=33bfbcb874f84e2da32202902250704&q=26.5255581,92.1670445"
      );
      const data = await response.json();

      // Save to MMKV
      storage.set(WEATHER_KEY, JSON.stringify(data));
      storage.set(WEATHER_FETCH_TIME_KEY, Date.now().toString());

      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadWeather = () => {
    const lastFetch = parseInt(
      storage.getString(WEATHER_FETCH_TIME_KEY) || "0"
    );
    const now = Date.now();

    // Use cache if within 30 minutes
    if (now - lastFetch < CACHE_DURATION) {
      const cached = storage.getString(WEATHER_KEY);
      if (cached) {
        setWeather(JSON.parse(cached));
        setLoading(false);
        return;
      }
    }

    // Otherwise fetch fresh
    fetchWeather();
  };

  useEffect(() => {
    loadWeather();
  }, []);

  if (!weather) return null;

  return (
    <View className="bg-white/90 rounded-2xl shadow-lg p-4 m-4 space-y-2">
      <Text className="text-xl font-bold text-gray-800">
        {weather.location.name}, {weather.location.region}
      </Text>

      <View className="flex-row items-center space-x-4">
        <Image
          source={{ uri: "https:" + weather.current.condition.icon }}
          style={{ width: 64, height: 64 }}
        />
        <View>
          <Text className="text-3xl font-semibold text-blue-600">
            {weather.current.temp_c}°C
          </Text>
          <Text className="text-sm text-gray-500">
            {weather.current.condition.text}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between mt-2">
        <View className="flex-row items-center space-x-1">
          <Feather name="wind" size={18} color="gray" />
          <Text className="text-gray-600 text-sm">
            {weather.current.wind_kph} kph
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <Feather name="droplet" size={18} color="gray" />
          <Text className="text-gray-600 text-sm">
            {weather.current.humidity}%
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <Feather name="thermometer" size={18} color="gray" />
          <Text className="text-gray-600 text-sm">
            Feels like {weather.current.feelslike_c}°C
          </Text>
        </View>
      </View>

      <Text className="text-xs text-gray-400 mt-2">
        Last updated: {weather.location.localtime}
      </Text>
    </View>
  );
};

export default WeatherCard;
