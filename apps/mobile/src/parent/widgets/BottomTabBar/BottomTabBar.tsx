import { IconSymbol } from "@/shared/ui/IconSymbol";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ACTIVE = "#1E90FF";
const INACTIVE = "#D9D9D9";
const BG = "#FFFFFF";
const TAB_HEIGHT = 100;

export default function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.frame, { paddingBottom: Math.max(bottom, 6) }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          const e = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !e.defaultPrevented)
            navigation.navigate(route.name);
        };

        const Icon = options.tabBarIcon?.({
          focused: isFocused,
          color: isFocused ? ACTIVE : INACTIVE,
          size: 24,
        }) ?? (
          <IconSymbol
            name="square.fill"
            size={24}
            color={isFocused ? ACTIVE : INACTIVE}
          />
        );

        const label = options.title;

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.item}
            android_ripple={{ color: "rgba(0,0,0,0.06)" }}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : undefined}
          >
            <View style={styles.iconWrap}>{Icon}</View>
            <Text
              style={[styles.label, { color: isFocused ? ACTIVE : INACTIVE }]}
              numberOfLines={1}
              ellipsizeMode="clip"
              allowFontScaling={false}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flexDirection: "row",
    height: TAB_HEIGHT,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: BG,
    borderTopWidth: 0,
    paddingHorizontal: 0,
    overflow: "visible",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: -2 },
      },
      android: { elevation: 10 },
    }),
  },
  item: {
    flex: 1,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0,
    overflow: "visible",
  },
  iconWrap: {
    width: 30,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    overflow: "visible",
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    includeFontPadding: false,
    textAlign: "center",
    textAlignVertical: "center",
    paddingHorizontal: 2,
    minWidth: 0,
  },
});
