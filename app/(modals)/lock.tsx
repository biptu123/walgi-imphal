import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Vibration,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withSpring,
  withSequence,
} from "react-native-reanimated";

const LockScreen = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const router = useRouter();
  const shakeAnimation = useSharedValue(0);

  useEffect(() => {
    handleAuthentication();
  }, []);

  const handleAuthentication = async () => {
    setAuthFailed(false);

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      console.log("⚠️ No biometrics available. Using device lock instead.");

      // Try using the device's default lock screen
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Unlock App",
        disableDeviceFallback: false, // Allows system fallback (PIN/Pattern)
      });

      if (result.success) {
        router.replace("/(tabs)");
      } else {
        triggerErrorFeedback();
      }

      return;
    }

    // If biometrics are available, use them first
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Unlock App",
      disableDeviceFallback: false,
      fallbackLabel: "Enter PIN",
      cancelLabel: "Cancel",
      requireConfirmation: false,
    });

    if (result.success) {
      router.replace("/(tabs)");
    } else {
      triggerErrorFeedback();
    }
  };

  const triggerErrorFeedback = () => {
    setAuthFailed(true);
    Vibration.vibrate(200); // Vibrate for 200ms

    // Trigger shake animation
    shakeAnimation.value = withSequence(
      withSpring(-10, { damping: 2, stiffness: 100 }),
      withSpring(10, { damping: 2, stiffness: 100 }),
      withSpring(-5, { damping: 2, stiffness: 100 }),
      withSpring(5, { damping: 2, stiffness: 100 }),
      withSpring(0, { damping: 2, stiffness: 100 })
    );
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-200 px-6">
      <StatusBar barStyle="dark-content" className="bg-gray-200" />

      <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
        <MaterialIcons name="lock-outline" size={50} color="gray" />
      </Animated.View>

      {authFailed && (
        <Text className="mt-2 text-sm text-red-500">
          Authentication Failed. Try Again.
        </Text>
      )}

      <TouchableOpacity
        onPress={handleAuthentication}
        className="mt-6 px-6 py-3 bg-blue-600 rounded-lg"
      >
        <Text className="text-white font-medium">Retry</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LockScreen;
