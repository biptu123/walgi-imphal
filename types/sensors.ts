export type SensorReading<T> = {
  id: T;
  value: number;
  timestamp: number;
};

export type Partition1Sensor =
  //temparature
  | "t"
  //humidity
  | "h";

export type Partition2Sensor =
  //soilmoisture
  "s0" | "s1" | "s2" | "s3";
