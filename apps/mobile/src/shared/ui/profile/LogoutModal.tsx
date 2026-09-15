import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LogoutModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({
  visible,
  onConfirm,
  onCancel,
}: LogoutModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>로그아웃</Text>
          <Text style={styles.text}>로그아웃하면 현재 계정으로는{"\n"}더 이상 이용할 수 없어요.{"\n"}다시 이용하려면 카카오 계정으로{"\n"}로그인해야 해요.</Text>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={onConfirm}>
              <Text style={styles.logoutText}>로그아웃</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: 356,
    backgroundColor: "#fff",
    padding: 28,
    borderRadius: 12,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  text: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },

  buttons: {
    marginTop: 32,
    flexDirection: "row",
    gap: 16,
  },

  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  logoutButton: {
    width: 142,
    height: 48,
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    color: "#1E90FF",
    fontWeight: "bold",
    fontSize: 16,
  },

  cancelButton: {
    width: 142,
    height: 48,
    borderColor: "#1E90FF",
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
