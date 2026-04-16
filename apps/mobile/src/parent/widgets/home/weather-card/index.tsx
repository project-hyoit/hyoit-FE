import Card from "@/shared/ui/Card";
import React from "react";
import { Image, StyleSheet, Text } from "react-native";

type Props = { temp: number; summary?: string };

export default function WeatherCard({ temp }: Props) {
  return (
    <Card style={s.card}>
      <Text style={s.title}>오늘의 날씨</Text>
      <Text style={s.temp}>{temp}°C</Text>
      <Image
        source={require("@/assets/images/weather-sun-cloud.jpg")}
        style={s.icon}
      />
    </Card>
  );
}

const s = StyleSheet.create({
  card: { padding: 16, alignItems: "flex-start" },
  title: {
    fontSize: 18,
    color: "#000",
    marginBottom: 6,
    fontWeight: "800",
  },
  temp: {
    fontSize: 28,
    fontWeight: "800",
    color: "#000",
    marginBottom: 6,
  },
  icon: {
    width: 120,
    height: 72,
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
});
