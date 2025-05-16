import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

// Helper to manage groups
export const getDripGroups = (): Record<string, string[]> => {
  const json = storage.getString("dripGroups");
  return json ? JSON.parse(json) : {};
};

export const saveDripGroups = (groups: Record<string, string[]>) => {
  storage.set("dripGroups", JSON.stringify(groups));
};
