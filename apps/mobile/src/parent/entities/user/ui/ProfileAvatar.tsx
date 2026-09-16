import mainProfileImg from "@/assets/images/profile-avatars/mainprofile.png";
import { IconSymbol } from "@/src/shared/ui/IconSymbol";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  avatarUri?: string;
  onPressEdit: () => void;
}

export default function ProfileAvatar({ avatarUri, onPressEdit }: Props) {
  return (
    <View style={styles.avatarWrapper}>
      <View style={styles.avatarBackground} />
      <Image
        source={avatarUri ? { uri: avatarUri } : mainProfileImg}
        style={styles.avatar}
      />

      <TouchableOpacity style={styles.editButton} onPress={onPressEdit}>
        <View style={styles.editIconCircle}>
          <IconSymbol name="camera" size={18} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarWrapper: {
    position: "relative",
    marginTop: 8,
    marginBottom: 8,
  },
  avatarBackground: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#F5F7FF",
    top: -10,
    left: -10,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  editButton: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },
  editIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1F3EA8",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
});
