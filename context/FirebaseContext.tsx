import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { onValue, ref, set, update, off } from "firebase/database";

// ✅ Define types
export type Reading = {
  id: string;
  h: number;
  s: number;
  t: number;
};

export type DeviceDetails = {
  auto: Mode;
  flag: Flag;
  max: number;
  min: number;
};

export type Flag = 0 | 1; // 0 => Off, 1 => On
export type Mode = 0 | 1; // 1 => Auto, 0 => Manual
export type OutputDevice = "s" | "d" | "l1" | "l2" | "l3" | "l4" | "s1" | "s2";

// ✅ Define context state
interface FirebaseContextProps {
  readings: Reading[];
  deviceDetails: Record<OutputDevice, DeviceDetails | null>;
  changeFlag: (
    device: OutputDevice,
    flag: Flag,
    max: number | null,
    min: number | null
  ) => Promise<void>;
  changeMode: (device: OutputDevice, mode: Mode) => Promise<void>;
}

// ✅ Create the context
const FirebaseContext = createContext<FirebaseContextProps | undefined>(
  undefined
);

// ✅ Create provider component
export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [deviceDetails, setDeviceDetails] = useState<
    Record<OutputDevice, DeviceDetails | null>
  >({
    s: null,
    d: null,
    l1: null,
    l2: null,
    l3: null,
    l4: null,
    s1: null,
    s2: null,
  });

  useEffect(() => {
    // ✅ Start listening for readings
    const readingRef = ref(db, "/");
    const unsubscribeReadings = onValue(readingRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      // Extract sensor readings
      const newReadings: Reading[] = Object.entries(data)
        .filter(([key]) => key !== "config")
        .map(([key, value]) => ({ ...(value as Reading), id: key }));

      setReadings(newReadings);
    });

    return () => {
      off(readingRef, "value", unsubscribeReadings);
    };
  }, []);

  // ✅ Function to get details for a specific device
  const fetchDeviceDetails = (device: OutputDevice) => {
    const deviceRef = ref(db, `config/${device}/`);

    const unsubscribeDetails = onValue(deviceRef, (snapshot) => {
      const details = snapshot.val();
      if (!details) return;
      setDeviceDetails((prev) => ({ ...prev, [device]: details }));
    });

    return () => off(deviceRef, "value", unsubscribeDetails);
  };

  useEffect(() => {
    const unsubscribers = [
      fetchDeviceDetails("s"),
      fetchDeviceDetails("d"),
      fetchDeviceDetails("l1"),
      fetchDeviceDetails("l2"),
      fetchDeviceDetails("l3"),
      fetchDeviceDetails("l4"),
      fetchDeviceDetails("s1"),
      fetchDeviceDetails("s2"),
    ];

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  // ✅ Update flag
  const changeFlag = async (
    device: OutputDevice,
    flag: Flag,
    max: number | null,
    min: number | null
  ) => {
    try {
      await update(ref(db, `config/${device}`), {
        flag,
        ...(max !== null && min !== null ? { max, min } : {}),
      });
    } catch (error) {
      console.error("Error updating flag:", error);
    }
  };

  // ✅ Update mode
  const changeMode = async (device: OutputDevice, mode: Mode) => {
    try {
      await set(ref(db, `config/${device}/auto`), mode);
    } catch (error) {
      console.error("Error updating mode:", error);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{ readings, deviceDetails, changeFlag, changeMode }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

// ✅ Custom hook to use Firebase context
export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};
