export type Partition1Actuator =
  //shader
  | "s1"
  | "s2"
  //foggers
  | "f0"
  | "f1"
  | "f2"
  | "f3"
  //exhausts
  | "e0"
  | "e1"
  | "e2"
  | "e3"
  | "e4";

export type ActuatorStatus<T> = {
  id: T;
  status: 0 | 1 | -1;
};

export type Partition2Actuator = "pi";

export type Partition3Actuator =
  //drippers
  | "d0"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "d8"
  | "d9"
  | "dA"
  | "dB"
  | "dC"
  | "dD"
  | "dE";

export interface DripGroup {
  id: string; // group name or UUID
  name: string; // human-readable name
  actuators: string[]; // list of actuator IDs
}
