import { getDripGroups, saveDripGroups } from "@/lib/storage";
import { useEffect, useState } from "react";

export function useDripGroups() {
  const [groups, setGroups] = useState<Record<string, string[]>>({});

  const refreshGroups = () => {
    const savedGroups = getDripGroups();
    setGroups(savedGroups);
  };

  useEffect(() => {
    if (Object.keys(getDripGroups()).length !== 4) {
      saveDripGroups({
        G1: ["d0", "d1", "d2", "d3", "d4"],
        G2: ["d5", "d6", "d7", "d8", "d9"],
        G3: ["dA", "dB", "dC", "dD", "dE"],
        All: [
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
        ],
      });
    }
    refreshGroups();
  }, []);

  const editGroup = (
    oldName: string,
    newName: string,
    actuatorIds: string[]
  ) => {
    const newGroups = { ...groups, [newName]: actuatorIds };

    if (newName !== oldName) delete newGroups[oldName];
    setGroups(newGroups);
    saveDripGroups(newGroups);
  };

  return { groups, editGroup, refreshGroups };
}
