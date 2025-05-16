import { Partition1Context } from "@/context/firebase/Partition1Context";
import { Partition2Context } from "@/context/firebase/Partition2Context";
import { Partition3Context } from "@/context/firebase/Partition3Context";
import { useContext } from "react";

export const usePartition1 = () => {
  const context = useContext(Partition1Context);
  if (!context)
    throw new Error("usePartition1 must be used within a Partition1Provider");
  return context;
};

export const usePartition2 = () => {
  const context = useContext(Partition2Context);
  if (!context)
    throw new Error("usePartition2 must be used within a Partition2Provider");
  return context;
};

export const usePartition3 = () => {
  const context = useContext(Partition3Context);
  if (!context)
    throw new Error("usePartition3 must be used within a Partition3Provider");
  return context;
};
