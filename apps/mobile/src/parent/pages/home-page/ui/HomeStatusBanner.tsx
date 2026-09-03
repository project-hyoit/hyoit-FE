import { Pressable, StyleSheet, Text, View } from "react-native";

import { HOME_STATUS_CONTENT, resolveHomeStatusLabel } from "../constants/homeStatus";
import type { HomeStatus } from "../types/home";

type HomeStatusBannerProps = {
  status: HomeStatus;
  pendingReceivedCount: number;
  onPress: () => void;
};

export default function HomeStatusBanner({
  status,
  pendingReceivedCount,
  onPress,
}: HomeStatusBannerProps) {
  const content = HOME_STATUS_CONTENT[status];
  const label = resolveHomeStatusLabel(status, pendingReceivedCount);

  return (
    <Pressable
      style={[
        s.container,
        {
          backgroundColor: content.backgroundColor,
          borderColor: content.borderColor,
        },
      ]}
      onPress={onPress}
    >
      {content.badgeText && content.badgeColor && (
        <View style={[s.badge, { backgroundColor: content.badgeColor }]}>
          <Text style={s.badgeText}>{content.badgeText}</Text>
        </View>
      )}

      <View style={s.textArea}>
        {label && (
          <Text style={[s.label, { color: content.ctaColor }]}>
            {label}
          </Text>
        )}

        <Text style={[s.title, { color: content.textColor }]}>
          {content.title}
        </Text>

        <Text style={[s.description, { color: content.descriptionColor }]}>
          {content.description}
        </Text>

        <Text style={[s.cta, { color: content.ctaColor }]}>
          {content.ctaLabel}
        </Text>
      </View>

      <View style={s.characterArea}>
        <View style={s.bubble}>
          <Text style={s.bubbleText}>💙</Text>
        </View>

        <View style={s.characterPlaceholder}>
          <Text style={s.characterText}>효잇</Text>
        </View>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  container: {
    position: "relative",
    height: 316,
    borderRadius: 14,
    borderWidth: 1,
    paddingTop: 30,
    paddingLeft: 24,
    paddingRight: 18,
    overflow: "visible",
  },

  textArea: {
    width: "56%",
    zIndex: 2,
  },

  label: {
    marginBottom: 6,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "900",
  },

  title: {
    fontSize: 28,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: -0.7,
  },

  description: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "800",
    letterSpacing: -0.3,
  },

  cta: {
    marginTop: 28,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "900",
    letterSpacing: -0.3,
  },

  characterArea: {
    position: "absolute",
    right: -12,
    bottom: 20,
    width: 210,
    height: 210,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  bubble: {
    position: "absolute",
    top: 24,
    left: 28,
    zIndex: 2,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  bubbleText: {
    fontSize: 24,
  },

  characterPlaceholder: {
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    alignItems: "center",
    justifyContent: "center",
  },

  characterText: {
    fontSize: 25,
    fontWeight: "900",
    color: "#6AA9FF",
  },

  badge: {
    position: "absolute",
    top: -20,
    right: -20,
    zIndex: 4,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    fontSize: 24,
    lineHeight: 29,
    fontWeight: "900",
    color: "#FFFFFF",
  },
});
