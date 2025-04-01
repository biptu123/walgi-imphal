import { db } from "@/config/firebase";
import { onValue, ref, set, update, off } from "firebase/database";

export type Reading = {
  id: string; // Input device ID
  h: number; // Humidity
  s: number; // Soil moisture
  t: number; // Temperature
};

export type DeviceDetails = {
  auto: Mode;
  flag: Flag;
  max: number;
  min: number;
};
export type Flag = 0 | 1; // 0 => Off, 1 => On
export type Mode = 0 | 1; // 1 => Auto, 0 => Manual
export type OutputDevice = "s" | "d" | "l1" | "l2" | "l3" | "l4"; // s => Sprinkler, d => Dripper, l1,l2 => Sprinkler lights, l3,l4 => Dripper lights

// ✅ Use update() to modify multiple values at once
export async function changeFlag(
  device: OutputDevice,
  flag: Flag,
  max: number | null,
  min: number | null
) {
  try {
    await update(ref(db, `config/${device}`), {
      flag,
      ...(max && min ? { max, min } : {}),
    });
  } catch (error) {
    console.error("Error updating flag:", error);
  }
}

// ✅ Use async/await for error handling
export async function changeMode(device: OutputDevice, mode: Mode) {
  try {
    await set(ref(db, `config/${device}/auto`), mode);
  } catch (error) {
    console.error("Error updating mode:", error);
  }
}

// ✅ Store the listener reference so it can be unsubscribed when needed
let readingListener: (() => void) | null = null;

export function getReading(setData: (p: Reading[]) => void) {
  const deviceRef = ref(db, "/");

  if (readingListener) off(deviceRef, "value", readingListener);

  readingListener = onValue(deviceRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // Extract sensor readings (excluding config)
    const readings: Reading[] = Object.entries(data)
      .filter(([key]) => key !== "config")
      .map(([key, value]) => ({ ...(value as Reading), id: key }));

    setData(readings);
  });
}

// ✅ Unsubscribe from Firebase when component unmounts
export function stopReadingListener() {
  if (readingListener) {
    off(ref(db, "/"), "value", readingListener);
    readingListener = null;
  }
}

// ✅ Store the listener reference so it can be unsubscribed when needed
let detailsListener: (() => void) | null = null;

export function getDetails(
  device: OutputDevice,
  setDetails: (p: DeviceDetails) => void
) {
  const deviceRef = ref(db, `config/${device}/`);

  if (detailsListener) off(deviceRef, "value", detailsListener);

  detailsListener = onValue(deviceRef, (snapshot) => {
    const details = snapshot.val();
    if (!details) return;
    setDetails(details);
  });
}

// ✅ Unsubscribe from details listener when needed
export function stopDetailsListener(device: OutputDevice) {
  if (detailsListener) {
    off(ref(db, `config/${device}/`), "value", detailsListener);
    detailsListener = null;
  }
}
