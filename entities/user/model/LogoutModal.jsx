import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

export default function LogoutModal({ visible, onConfirm, onCancel }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>
            로그아웃
          </Text>
          <Text style={styles.text}>
            로그아웃 하시겠어요?
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancleButton} onPress={onCancel}>
              <Text style={styles.cancel}>로그아웃</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.noButton} onPress={onConfirm}>
              <Text style={styles.no}>아니요</Text>
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
    paddingVertical: 28,
    backgroundColor: "#fff",
    padding: 28,
    borderRadius: 12,
    alignItems: "center",
  },

  title: {
    marginTop: 28,
    fontSize: 24,
    fontWeight: "bold", 
  },

  text: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold", 
  },
 
  buttons: {
    marginTop: 32,
    flexDirection: "row",
    gap: 16,
  },

  cancel: {
    color: "#1E90FF",
    fontWeight: "bold", 
    text: 16,
  },

  cancleButton: {
    width: 142,
    height: 48,
    borderColor: "#1E90FF",
    borderWidth:1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  no: {
    color: "white",
    fontWeight: "bold",
    text: 16,
  },

  noButton: {
    width: 142,
    height: 48,
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  }
});