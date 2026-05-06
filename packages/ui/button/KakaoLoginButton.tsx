import React from "react";
import {
  Image,
  type ImageSourcePropType,
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { COLORS } from "../theme/colors";

type Props = {
  onPress: () => void | Promise<void>;
  accessibilityLabel?: string;
  iconSource: ImageSourcePropType;
};

export function KakaoLoginButton({
  onPress,
  accessibilityLabel,
  iconSource,
}: Props) {
  const [pending, setPending] = React.useState(false);

  const handlePress = () => {
    if (pending) return;
    setPending(true);
    Promise.resolve(onPress()).finally(() => setPending(false));
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={pending}
      android_ripple={{ color: "rgba(0,0,0,0.06)" }}
      style={({ pressed }) => [s.btn, pressed && s.pressed]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? "카카오 계정으로 간편 로그인"}
      hitSlop={8}
    >
      <Image source={iconSource} style={s.icon} />
      <Text style={s.label} allowFontScaling={false}>
        카카오 계정으로 간편 로그인
      </Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  btn: {
    alignSelf: "stretch",
    backgroundColor: "#FDE500",
    borderRadius: 24,
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 26,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
    }),
  },
  pressed: { opacity: 0.9 },
  icon: { width: 28, height: 28, resizeMode: "contain", marginLeft: 16},
  label: { fontSize: 18, color: COLORS.text },
});
