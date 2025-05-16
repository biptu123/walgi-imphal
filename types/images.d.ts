// images.d.ts
declare module "*.png" {
  const value: number; // for Expo's Asset module
  export default value;
}

declare module "*.jpg" {
  const value: number;
  export default value;
}

declare module "*.jpeg" {
  const value: number;
  export default value;
}

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
