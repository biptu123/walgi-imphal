import React, { createContext, useContext, useEffect, useState } from "react";
import { onValue, ref, update, off } from "firebase/database";
import { Partition2Sensor, SensorReading } from "@/types/sensors";
import { partition2Db } from "@/config/firebase/partition2";
import { ActuatorStatus, Partition2Actuator } from "@/types/actuators";

interface Partition2ContextProps {
  sensorReadings: SensorReading<Partition2Sensor>[];
  actuatorStatus: Record<
    Partition2Actuator,
    ActuatorStatus<Partition2Actuator> | null
  >;
  changeStatus: (
    id: Partition2Actuator,
    status: ActuatorStatus<Partition2Actuator>["status"]
  ) => Promise<void>;
}

// Create context
export const Partition2Context = createContext<
  Partition2ContextProps | undefined
>(undefined);

export const Partition2Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sensorReadings, setSensorReadings] = useState<
    SensorReading<Partition2Sensor>[]
  >([]);

  const [actuatorStatus, setActuatorStatus] = useState<
    Record<Partition2Actuator, ActuatorStatus<Partition2Actuator> | null>
  >({
    pi: null,
  });

  // Listen for sensor readings
  useEffect(() => {
    const sensorRef = ref(partition2Db, "/s");
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const readings: SensorReading<Partition2Sensor>[] = Object.entries(
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
    const actuators: Partition2Actuator[] = ["pi"];

    const unsubscribers = actuators.map((id) => {
      const statusRef = ref(partition2Db, `/a/${id}`);
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

  const changeStatus = async (id: Partition2Actuator, status: 0 | 1 | -1) => {
    try {
      await update(ref(partition2Db, `/a/${id}`), {
        s: status,
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <Partition2Context.Provider
      value={{ sensorReadings, actuatorStatus, changeStatus }}
    >
      {children}
    </Partition2Context.Provider>
  );
};
