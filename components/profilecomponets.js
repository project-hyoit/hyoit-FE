import React from "react";
import { Image } from "react-native";

export default function IconProfile({ style }) {
  return (
    <Image
      source={require("../assets/profileimg/profile.png")}
      style={style}
    />
  );
}