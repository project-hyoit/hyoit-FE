import React from "react";
import { Image } from "react-native";

export default function IconMainprofile({ style }) {
  return (
    <Image
      source={require("../assets/profileimg/mainprofile.png")}
      style={style}
    />
  );
}