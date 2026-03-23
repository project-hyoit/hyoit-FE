import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

export default function LogoutModal({ visible, onConfirm, onCancel }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.text}>
            정말 로그아웃 하시겠습니까?
          </Text>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.cancel}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirm}>
              <Text style={styles.confirm}>확인</Text>
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: 260,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },

  text: {
    marginBottom: 20,
    fontSize: 14,
  },

  buttons: {
    flexDirection: "row",
    gap: 20,
  },

  cancel: {
    color: "gray",
  },

  confirm: {
    color: "red",
    fontWeight: "bold",
  },
});