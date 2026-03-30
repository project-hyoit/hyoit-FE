import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ProfileMenu({
  visible,
  onClose,
  onSelectAlbum,
  onDefault,
}) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.background} onPress={onClose} activeOpacity={1}/>
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
    top: -40,
    right: -52,
  },

  background: {
    ...StyleSheet.absoluteFillObject,
  },

  menu: {
    top: 228,
    right: 60,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 6,
    width: 128,
    height: 96,
    alignItems: "center",
  },

  item1: {
    fontSize: 14,
    marginTop:16,
  },

  item2: {
    fontSize: 14,
    marginTop:20,
  },
});