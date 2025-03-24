import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { MMKV } from "react-native-mmkv";
const storage = new MMKV({
  id: "UserInactivity",
});

const TIME = 3000; //miliseconds

export const UserInActivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
  }, []);
  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === "inactive") {
      router.push("/(modals)/white");
    } else if (router.canGoBack()) {
      router.back();
    }
  };
  return children;
};
