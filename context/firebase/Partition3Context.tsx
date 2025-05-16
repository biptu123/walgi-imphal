import React, { createContext, useContext, useEffect, useState } from "react";
import { onValue, ref, update, off } from "firebase/database";
import { ActuatorStatus, Partition3Actuator } from "@/types/actuators";
import { partition3Db } from "@/config/firebase/partition3";

interface Partition3ContextProps {
  actuatorStatus: Record<
    Partition3Actuator,
    ActuatorStatus<Partition3Actuator> | null
  >;
  changeStatus: (
    id: Partition3Actuator,
    status: ActuatorStatus<Partition3Actuator>["status"]
  ) => Promise<void>;
}

// Create context
export const Partition3Context = createContext<
  Partition3ContextProps | undefined
>(undefined);

export const Partition3Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [actuatorStatus, setActuatorStatus] = useState<
    Record<Partition3Actuator, ActuatorStatus<Partition3Actuator> | null>
  >({
    d0: null,
    d1: null,
    d2: null,
    d3: null,
    d4: null,
    d5: null,
    d6: null,
    d7: null,
    d8: null,
    d9: null,
    dA: null,
    dB: null,
    dC: null,
    dD: null,
    dE: null,
  });

  // Listen for actuator statuses
  useEffect(() => {
    const actuators: Partition3Actuator[] = [
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

    const unsubscribers = actuators.map((id) => {
      const statusRef = ref(partition3Db, `/a/${id}`);
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
  const changeStatus = async (id: Partition3Actuator, status: 0 | 1 | -1) => {
    try {
      await update(ref(partition3Db, `/a/${id}`), {
        s: status,
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };
  return (
    <Partition3Context.Provider value={{ actuatorStatus, changeStatus }}>
      {children}
    </Partition3Context.Provider>
  );
};
