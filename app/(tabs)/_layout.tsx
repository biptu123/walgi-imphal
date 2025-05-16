import Tabbar from "@/components/Tabbar";
import { Tabs } from "expo-router";

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
      <Tabs.Screen name="shade" options={{ title: "Shade" }} />
      <Tabs.Screen name="drip" options={{ title: "Drip" }} />
      <Tabs.Screen name="fogger" options={{ title: "Fogger" }} />
      <Tabs.Screen name="exhaust" options={{ title: "Exhaust" }} />
      <Tabs.Screen name="about" options={{ title: "About" }} />
    </Tabs>
  );
};

export default TabsLayout;
