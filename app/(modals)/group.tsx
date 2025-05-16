import { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useDripGroups } from "@/hooks/useDripGroups";

const allDrippers = [
  "d0",
  "d1",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "d8",
  "d9",
  "dA",
  "dB",
  "dC",
  "dD",
  "dE",
];

export default function GroupModal() {
  const router = useRouter();
  const { groupName } = useLocalSearchParams<{ groupName: string }>();

  const { groups, editGroup } = useDripGroups();
  const group = groups[groupName];

  const [newGroupName, setNewGroupName] = useState(groupName);
  const [selectedDrippers, setSelectedDrippers] = useState<string[]>(
    group || []
  );

  useEffect(() => {
    setNewGroupName(groupName);
    setSelectedDrippers(group || []);
  }, [groupName, group]);

  const toggleDripper = (dripperId: string) => {
    setSelectedDrippers((prev) =>
      prev.includes(dripperId)
        ? prev.filter((id) => id !== dripperId)
        : [...prev, dripperId]
    );
  };

  const handleSave = () => {
    if (!newGroupName.trim()) {
      alert("Group name cannot be empty");
      return;
    }

    if (selectedDrippers.length === 0) {
      alert("Group cannot be empty");
      return;
    }
    editGroup(groupName, newGroupName.trim(), selectedDrippers);
    router.back();
  };

  if (!group) {
    return (
      <View className="flex-1 bg-white pt-12 px-5">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center mb-6"
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
          <Text className="ml-2 text-lg font-semibold">Back</Text>
        </Pressable>
        <Text className="text-red-500">Group not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white pt-12 px-5">
      {/* Header with back arrow */}
      <Pressable
        onPress={() => router.back()}
        className="flex-row items-center mb-6"
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text className="ml-2 text-lg font-semibold">Back</Text>
      </Pressable>

      <Text className="text-xl font-bold mb-4">Edit Dripper Group</Text>

      {/* Group Name Input */}
      <Text className="mb-2 font-semibold">Group Name:</Text>
      <TextInput
        value={newGroupName}
        onChangeText={setNewGroupName}
        className="border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Enter group name"
      />

      {/* Drippers selection */}
      <Text className="mb-2 font-semibold">Select Drippers:</Text>
      <ScrollView className="max-h-40 mb-4">
        <View className="flex flex-wrap flex-row justify-evenly gap-2">
          {allDrippers.map((dripper, index) => {
            const selected = selectedDrippers.includes(dripper);
            return (
              <Pressable
                key={dripper}
                onPress={() => toggleDripper(dripper)}
                className={`flex-row items-center w-[18%] py-2 rounded-full border justify-center ${
                  selected
                    ? "bg-green-100 border-green-500"
                    : "bg-white border-gray-300"
                }`}
              >
                <Ionicons
                  name={selected ? "checkmark-circle" : "ellipse-outline"}
                  size={20}
                  color={selected ? "green" : "gray"}
                  className="mr-1"
                />
                <Text
                  className={`font-medium ${selected ? "text-green-700" : ""}`}
                >
                  D{index + 1}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Save Button */}
      <Pressable
        onPress={handleSave}
        className="bg-blue-600 px-4 py-2 rounded self-start"
      >
        <Text className="text-white font-semibold">Save</Text>
      </Pressable>
    </View>
  );
}
