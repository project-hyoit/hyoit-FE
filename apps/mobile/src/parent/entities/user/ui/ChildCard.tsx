import { Image, StyleSheet, Text, View } from "react-native";
import type { ChildUser } from "../model/types";

type ChildCardProps = Omit<ChildUser, "id">;

export default function ChildCard({
  name,
  phone,
  isOnline = false,
}: ChildCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <Image
          source={require("@/assets/profileimg/mainprofile.png")}
          style={styles.img}
        />
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.phone}>{phone}</Text>
        {isOnline && <View style={styles.online} />}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    marginTop: 8,
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 60,
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

  img: {
    width: 34,
    height: 34,
  },

  name: {
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 12,
  },

  phone: {
    fontSize: 12,
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
