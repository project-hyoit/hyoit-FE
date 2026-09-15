import { Image, StyleSheet, Text, View } from "react-native";

import mainProfileImg from "@/assets/images/profile-avatars/mainprofile.png";

import type { ChildUser } from "../model/types";

type ChildCardProps = Omit<ChildUser, "id">;

export default function ChildCard({
  name,
  isOnline = false,
}: ChildCardProps) {
  const statusLabel = isOnline ? "활성" : "비활성";
  const description = isOnline
    ? "서로의 안부를 주고받고 있어요."
    : "현재 연결이 비활성 상태예요.";

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <Image source={mainProfileImg} style={styles.img} />
        <View style={styles.textSection}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.relation}>자녀</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      <View style={[styles.statusBadge, isOnline ? styles.active : styles.inactive]}>
        <Text style={[styles.statusText, isOnline ? styles.activeText : styles.inactiveText]}>
          {statusLabel}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
  },
  leftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  textSection: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  img: {
    width: 54,
    height: 54,
    borderRadius: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  relation: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  description: {
    marginTop: 6,
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  statusBadge: {
    minWidth: 54,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  active: {
    backgroundColor: "#E6F8EF",
  },
  inactive: {
    backgroundColor: "#F4F4F5",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  activeText: {
    color: "#2B8A3E",
  },
  inactiveText: {
    color: "#6B7280",
  },
});
