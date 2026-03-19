import React from "react";
import { Image } from "react-native";

export default function IconCorrection({ style }) {
  return (
    <Image
      source={require("../assets/profileimg/correction.png")}
      style={style}
    />
  );
}