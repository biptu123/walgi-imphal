import React, { createContext, useContext, useEffect, useState } from "react";
import { onValue, ref, update, off } from "firebase/database";
import { Partition1Sensor, SensorReading } from "@/types/sensors";
import { ActuatorStatus, Partition1Actuator } from "@/types/actuators";
import { partition1Db } from "@/config/firebase/partition1";

interface Partition1ContextProps {
  sensorReadings: SensorReading<Partition1Sensor>[];
  actuatorStatus: Record<
    Partition1Actuator,
    ActuatorStatus<Partition1Actuator> | null
  >;
  changeStatus: (
    id: Partition1Actuator,
    status: ActuatorStatus<Partition1Actuator>["status"]
  ) => Promise<void>;
}

// Create context
export const Partition1Context = createContext<
  Partition1ContextProps | undefined
>(undefined);

export const Partition1Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sensorReadings, setSensorReadings] = useState<
    SensorReading<Partition1Sensor>[]
  >([]);
  const [actuatorStatus, setActuatorStatus] = useState<
    Record<Partition1Actuator, ActuatorStatus<Partition1Actuator> | null>
  >({
    s1: null,
    s2: null,
    e0: null,
    e1: null,
    e2: null,
    e3: null,
    e4: null,
    f0: null,
    f1: null,
    f2: null,
    f3: null,
  });

  // Listen for sensor readings
  useEffect(() => {
    const sensorRef = ref(partition1Db, "/s");
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const readings: SensorReading<Partition1Sensor>[] = Object.entries(
        data
      ).map(([key, value]: any) => ({
        id: key,
        value: value.v,
        timestamp: value.t,
      }));
      setSensorReadings(readings);
    });

    return () => off(sensorRef, "value", unsubscribe);
  }, []);

  // Listen for actuator statuses
  useEffect(() => {
    const actuators: Partition1Actuator[] = [
      "s1",
      "s2",
      "f0",
      "f1",
      "f2",
      "f3",
      "e0",
      "e1",
      "e2",
      "e3",
      "e4",
    ];

    const unsubscribers = actuators.map((id) => {
      const statusRef = ref(partition1Db, `/a/${id}`);
      const unsubscribe = onValue(statusRef, (snapshot) => {
        const value = snapshot.val();
        if (value == null || typeof value.s !== "number") return;

        setActuatorStatus((prev) => ({
          ...prev,
          [id]: {
            id,
            status: value.s,
          },
        }));
      });
      return () => off(statusRef, "value", unsubscribe);
    });

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, []);

  // Only update status (no timestamp)
  const changeStatus = async (id: Partition1Actuator, status: 0 | 1 | -1) => {
    try {
      await update(ref(partition1Db, `/a/${id}`), {
        s: status,
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };
  return (
    <Partition1Context.Provider
      value={{ sensorReadings, actuatorStatus, changeStatus }}
    >
      {children}
    </Partition1Context.Provider>
  );
};
