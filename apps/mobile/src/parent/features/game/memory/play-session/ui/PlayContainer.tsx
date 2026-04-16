import { BG } from "@/shared/config/theme";
import BottomTray from "@/widgets/game/memory/BottomTray";
import MemoryBoard from "@/widgets/game/memory/MemoryBoard";
import PlayHeader from "@/widgets/game/memory/PlayHeader";
import ResultOverlay from "@/widgets/game/memory/ResultOverlay";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMemoryPlaySession } from "../hooks/useMemoryPlaySession";
export default function PlayContainer({ level }: { level?: string }) {
  const insets = useSafeAreaInsets();
  const [trayH, setTrayH] = useState(0);
  const { headerProps, boardProps, trayProps, overlayProps } =
    useMemoryPlaySession(level);

  return (
    <View style={s.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={[
          s.content,
          { paddingBottom: trayH + insets.bottom + 12, flexGrow: 1 },
        ]}
      >
        <PlayHeader {...headerProps} />
        <View style={{ height: 10 }} />
        <MemoryBoard {...boardProps} />
      </ScrollView>

      <View style={s.trayWrap} pointerEvents="box-none">
        <View
          onLayout={(e) => setTrayH(e.nativeEvent.layout.height)}
          pointerEvents="box-none"
        >
          <BottomTray {...trayProps} style={{ marginTop: 0 }} />
        </View>
        <View
          style={[s.bottomPad, { height: insets.bottom }]}
          pointerEvents="none"
        />
      </View>

      <ResultOverlay {...overlayProps} />
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: BG },
  content: { paddingTop: 50 },
  trayWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
  },
  bottomPad: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
  },
});
