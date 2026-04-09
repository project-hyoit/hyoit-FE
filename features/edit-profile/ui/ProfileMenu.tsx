import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProfileMenuProps {
  visible: boolean;
  onClose: () => void;
  onSelectAlbum: () => void;
  onDefault: () => void;
}

export default function ProfileMenu({
  visible,
  onClose,
  onSelectAlbum,
  onDefault,
}: ProfileMenuProps) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity
        style={styles.background}
        onPress={onClose}
        activeOpacity={1}
      />
      <View style={styles.menu}>
        <TouchableOpacity onPress={onSelectAlbum}>
          <Text style={styles.item1}>앨범에서 사진 선택</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDefault}>
          <Text style={styles.item2}>기본 프로필 적용</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
  },

  background: {
    ...StyleSheet.absoluteFillObject,
  },

  menu: {
    position: "absolute",
    top: 140,
    right: -100,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 6,
    width: 128,
    height: 96,
    alignItems: "center",
  },

  item1: {
    fontSize: 14,
    marginTop: 16,
  },

  item2: {
    fontSize: 14,
    marginTop: 20,
  },
});
