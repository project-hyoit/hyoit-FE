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
        <TouchableOpacity style={styles.menuItem} onPress={onSelectAlbum}>
          <Text style={styles.itemText}>앨범에서 사진 선택</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={onDefault}>
          <Text style={styles.itemText}>기본 프로필 적용</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },

  background: {
    ...StyleSheet.absoluteFillObject,
  },

  menu: {
    position: "absolute",
    top: 140,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 6,
    width: 180,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  menuItem: {
    paddingVertical: 10,
  },

  itemText: {
    fontSize: 14,
  },
});
