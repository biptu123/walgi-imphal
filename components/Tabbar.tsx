import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import clsx from "clsx";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Define valid route names for better TypeScript safety
type TabRoutes = "index" | "about" | "drip" | "sprinkler";

// Define icon props type
type IconProps = { size?: number; color?: string };

// Icon mapping object with explicit typing
const icons: Record<TabRoutes, (props: IconProps) => JSX.Element> = {
  index: (props) => <AntDesign name="home" {...props} />,
  about: (props) => <AntDesign name="infocirlceo" {...props} />,
  drip: (props) => <FontAwesome6 name="faucet-drip" {...props} />,
  sprinkler: (props) => (
    <MaterialCommunityIcons name="sprinkler-variant" {...props} />
  ),
};

const Tabbar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View className="flex flex-row absolute bottom-6 justify-between items-center bg-white mx-5 py-4 rounded-full shadow-[0px_10px_10px_rgba(0,0,0,0.1)]">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: string =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.7}
            className="flex-1 justify-center items-center"
          >
            {icons[route.name as TabRoutes]?.({
              size: 24,
              color: isFocused ? "blue" : "gray",
            })}
            <Text
              className={clsx(
                "text-gray-600 text-sm",
                isFocused && "text-blue-600 font-[Helvetica-Bold]"
              )}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Tabbar;
