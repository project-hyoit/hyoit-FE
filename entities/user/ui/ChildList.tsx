import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
const child = require("../../../assets/profileimg/child.png")
const online = require("../../../assets/profileimg/online.png")

export default function ChildCard() {
  return (
    <View style={styles.card}>
      <Image source={child} style={styles.IMG}/>
      <Text style={styles.name}>김유찬</Text>

      <Text style={styles.phone}>010-4610-3405</Text>

      <Image source={online} style={styles.online} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 24,
    flexDirection: "row",
    alignItems: "center",
    width: 340,
    height: 60,
    backgroundColor :"#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 24,
  },

  IMG: {
    width: 34,
    height: 34,
  },

  name: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Pretendard",
    marginLeft: 16,
  },

  phone: {
    marginLeft: 80,
    fontSize: 12,
    fontFamily: "Pretendard",
    fontWeight: "600",
  },

  online: {
    marginLeft: 8,
    width: 12,
    height: 12,
  },
});