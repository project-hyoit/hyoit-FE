import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconMainprofile from '../../../components/mainprofilecomponets.js';

const user = {
  name: "김유찬",
  phone: "010-4610-3405",
};

export default function ChildList() {
  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <IconMainprofile style={styles.IMG} />
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.phone}>{user.phone}</Text>
        <View style={styles.online} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 8,
    marginLeft: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 340,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  IMG: {
    width: 34,
    height: 34,
  },

  name: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Pretendard",
    marginLeft: 12,
  },

  phone: {
    fontSize: 12,
    fontFamily: "Pretendard",
    fontWeight: "600",
    marginRight: 6,
  },

  online: {
    width: 12,
    height: 12,
    backgroundColor: "#50CD5C",
    borderRadius: 12,
  },
});