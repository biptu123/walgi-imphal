import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({ id: "UserInactivity" });

const LOCK_TIME = 3 * 60 * 1000; // 3 minutes

export const UserInActivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // ✅ Check if the app was never unlocked before
    checkIfShouldLockOnLaunch();

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === "background") {
      recordStartTime();
    } else if (nextAppState === "active" && appState.current === "background") {
      const elapsed = Date.now() - (storage.getNumber("startTime") || 0);
      if (elapsed >= LOCK_TIME) {
        router.replace("/(modals)/lock");
      }
    }

    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    storage.set("startTime", Date.now());
  };

  // ✅ Ensure the lock screen appears on the first launch if necessary
  const checkIfShouldLockOnLaunch = () => {
    const lastUnlockTime = storage.getNumber("startTime");
    const wasUnlocked = storage.getBoolean("wasUnlocked") || false;

    if (
      !wasUnlocked ||
      (lastUnlockTime && Date.now() - lastUnlockTime >= LOCK_TIME)
    ) {
      router.replace("/(modals)/lock");
    }
  };

  return children;
};
