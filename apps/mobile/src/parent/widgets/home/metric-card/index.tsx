import BarSparkline from "@/shared/ui/BarSparkline";
import Card from "@/shared/ui/Card";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  message: string;
  data: number[];
  reverseBars?: boolean;
};
export default function MetricCard({
  title,
  message,
  data,
  reverseBars,
}: Props) {
  const bars = reverseBars ? [...data].reverse() : data;
  return (
    <Card style={[styles.card]}>
      <View style={styles.fill}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.msg}>{message}</Text>
      </View>

      <View style={styles.graphWrap}>
        <BarSparkline values={bars} gap={10} height={80} color="#1E90FF" />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  fill: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
    marginBottom: 6,
  },
  msg: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    opacity: 0.9,
  },
  graphWrap: {
    paddingTop: 8,
    alignItems: "flex-start",
  },
});
