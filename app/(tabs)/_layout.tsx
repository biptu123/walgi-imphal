import Tabbar from "@/components/Tabbar";
import { Tabs } from "expo-router";
import { Easing } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <Tabbar {...props} />}
      screenOptions={{
        headerShown: false,
        animation: "shift",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="drip" options={{ title: "Drip" }} />
      <Tabs.Screen name="sprinkler" options={{ title: "Sprinkler" }} />
      <Tabs.Screen name="about" options={{ title: "About" }} />
    </Tabs>
  );
};

export default TabsLayout;
