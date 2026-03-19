import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import IconMainprofile from '../../../components/mainprofilecomponets.js';

const user = {
  name: "김유찬",
  phone: "010-4610-3405",
};

export default function ChildCard() {
  return (
    <View style={styles.card}>
      <IconMainprofile style={styles.IMG}/>
      <Text style={styles.name}>{user.name}</Text>

      <Text style={styles.phone}>{user.phone}</Text>

      <View style={styles.online} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop : 8,
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
    width : 63,
    height : 36,
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
    backgroundColor : "#50CD5C",
    borderRadius: 12,
  },
});