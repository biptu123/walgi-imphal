import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  getDetails,
  changeFlag,
  changeMode,
  stopDetailsListener,
  DeviceDetails,
  OutputDevice,
} from "@/lib/firebase";

interface ControlPanelProps {
  deviceId: OutputDevice;
  title: string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ deviceId, title }) => {
  const [details, setDetails] = useState<DeviceDetails | null>(null);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getDetails(deviceId, setDetails);
    return () => stopDetailsListener(deviceId);
  }, [deviceId]);

  const toggleFlag = () => {
    if (details && details.auto === 0) {
      changeFlag(
        deviceId,
        details.flag === 1 ? 0 : 1,
        details.max,
        details.min
      );
    }
  };

  const handleAutoModeToggle = () => {
    if (details?.auto === 0) {
      setModalVisible(true);
    } else {
      changeMode(deviceId, 0);
    }
  };

  const applyMinMax = () => {
    if (minValue && maxValue && Number(maxValue) >= Number(minValue)) {
      changeFlag(
        deviceId,
        details?.flag ?? 0,
        Number(maxValue),
        Number(minValue)
      );
      changeMode(deviceId, 1);
      setModalVisible(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gradient-to-b from-blue-500 to-blue-800 px-6 bg-gray-200">
      <Text className="text-3xl font-extrabold mb-6 text-gray-600">
        {title}
      </Text>

      {details ? (
        <>
          {/* Auto Mode Toggle */}
          <View className="w-full flex-row items-center justify-between bg-white px-6 py-4 rounded-xl shadow-lg mb-6">
            <Text className="text-lg font-semibold text-gray-900">
              Auto Mode
            </Text>
            <Switch
              value={details.auto === 1}
              onValueChange={handleAutoModeToggle}
              trackColor={{ false: "#ddd", true: "#4CAF50" }}
              thumbColor={details.auto === 1 ? "#ffffff" : "#f4f3f4"}
            />
          </View>

          {/* Status Indicator */}
          <View
            className={`w-44 h-44 rounded-full flex items-center justify-center shadow-xl mb-6 border-4 ${
              details.flag === 1
                ? "bg-green-500 border-green-300"
                : "bg-red-500 border-red-300"
            }`}
          >
            <Text className="text-white text-3xl font-extrabold">
              {details.flag === 1 ? "ON" : "OFF"}
            </Text>
          </View>

          {/* Toggle Button (Only for Manual Mode) */}
          {details.auto === 0 && (
            <TouchableOpacity
              onPress={toggleFlag}
              className="bg-white px-8 py-4 rounded-full shadow-lg"
            >
              <Text
                className={`text-xl font-semibold ${
                  details.flag === 1 ? "text-red-500" : "text-green-500"
                }`}
              >
                {details.flag === 1 ? "Turn OFF" : "Turn ON"}
              </Text>
            </TouchableOpacity>
          )}

          {/* Min/Max Value Modal */}
          <Modal visible={isModalVisible} animationType="fade" transparent>
            <View className="flex-1 justify-center items-center bg-black/60 px-4">
              <View className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
                <Text className="text-2xl font-bold text-center mb-4 text-gray-900">
                  Set Moisture Limits
                </Text>

                <TextInput
                  placeholder="Min Moisture"
                  keyboardType="numeric"
                  value={minValue}
                  onChangeText={setMinValue}
                  className="mt-2 p-4 bg-gray-100 rounded-lg text-center text-lg border border-gray-300"
                />
                <TextInput
                  placeholder="Max Moisture"
                  keyboardType="numeric"
                  value={maxValue}
                  onChangeText={setMaxValue}
                  className="mt-3 p-4 bg-gray-100 rounded-lg text-center text-lg border border-gray-300"
                />

                <View className="flex-row justify-between mt-6">
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    className="bg-gray-400 px-5 py-3 rounded-full"
                  >
                    <Text className="text-white text-lg font-semibold">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={applyMinMax}
                    className="bg-blue-600 px-5 py-3 rounded-full"
                  >
                    <Text className="text-white text-lg font-semibold">
                      Apply
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
    </View>
  );
};

export default ControlPanel;
