import { router } from "expo-router";
import React, { useState, useRef } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
} from "react-native";

export default function VerifyCode() {
  const myCode = "927582";
  const [childCode, setChildCode] = useState("");
  const canNext = /^\d{6}$/.test(childCode);
  const [showConfirm, setShowConfirm] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const openModal = () => {
    setShowConfirm(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setShowConfirm(false));
  };

  return (
    <View style={s.wrap}>
      <Text style={s.title} allowFontScaling={false}>
        가족구성원 추가를 위한{"\n"}인증번호가 생성되었어요
      </Text>
      <View style={s.myCodeCard}>
        <Text style={s.myCodeLabel} allowFontScaling={false}>
          내 인증 번호
        </Text>
        <Text style={s.myCodeText} allowFontScaling={false}>
          {myCode}
        </Text>
      </View>
      <Text style={s.text}>
        자녀분 핸드폰을 통해 인증번호를 입력해주세요
      </Text>
      <View style={{ marginTop: 12, alignItems: "flex-end" }}>
        <Pressable onPress={openModal} style={s.modalButton}>
          <Text style={s.modalButtonText}>모달 확인</Text>
        </Pressable>
      </View>

      {showConfirm && (
        <>
          <Pressable style={s.overlay} onPress={closeModal} />
          <Animated.View
            style={[
              s.bottomSheet,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={s.sheetTitle}>
              이 분이 자녀 분이 맞으신가요?
            </Text>

            <View style={s.userCard}>
              <View style={s.left}>
                <Image style={s.img} source={require("@/assets/profileimg/mainprofile.png")} />
                <Text style={s.name}>김유찬</Text>
              </View>
              <Text style={s.phone}>010-4610-3405</Text>
            </View>

            <View style={s.row}>
              <Pressable style={s.cancelButton} onPress={closeModal}>
                <Text style={s.cancel}>←  아니에요</Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/onboarding/success")}
                style={s.okButton}
              >
                <Text style={s.ok}>맞아요 →</Text>
              </Pressable>
            </View>
          </Animated.View>
        </>
      )}
    </View>
  );
}

const COLORS = {
  bg: "#FFFFFF",
  text: "#000000",
  label: "#454545",
  border: "#B6B6B6",
  card: "#F5F5F5",
  primary: "#1E90FF",
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 120,
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    color: COLORS.text,
    fontWeight: "600",
    marginBottom: 64,
  },
  myCodeCard: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 32,
    marginBottom: 20,
    gap: 20,
  },
  myCodeLabel: { 
    fontSize: 16, 
    color: COLORS.text, 
    fontWeight: "600" 
  },
  myCodeText: {
    fontSize: 32,
    lineHeight: 40,
    color: COLORS.text,
    fontWeight: "800",
    letterSpacing: 2,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#434343",
  },
  modalButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 28,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 299,
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 32,
    textAlign: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  userCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E9E9E9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 36,
    alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  name: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: "600",
  },
  phone: {
    fontSize: 16,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancel: {
    color: "#1E90FF",
    fontSize: 16,
    fontWeight: "700",
  },
  cancelButton: {
    width: 116,
    height: 48,
    borderColor: "#1E8FFF",
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  ok: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  okButton: {
    width: 102,
    height: 48,
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});