import React from "react";
import { View } from "react-native";

type Props = {
  values: number[];
  color?: string;
  gap?: number;
  height?: number;
};

export default function BarSparkline({
  values,
  color = "#1E90FF",
  gap = 6,
  height = 72,
}: Props) {
  const max = Math.max(...values, 1);
  return (
    <View style={{ flexDirection: "row", gap }}>
      {values.map((v, i) => {
        const h = Math.max((v / max) * height, 6);
        return (
          <View
            key={i}
            style={{
              width: 8,
              height: h,
              borderRadius: 4,
              backgroundColor: color,
              alignSelf: "flex-end",
            }}
          />
        );
      })}
    </View>
  );
}
