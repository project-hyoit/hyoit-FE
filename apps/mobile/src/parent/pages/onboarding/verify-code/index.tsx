import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function VerifyCodeScreen() {
  const myCode = "927582";
  const [childCode, setChildCode] = useState("");
  const canNext = /^\d{6}$/.test(childCode);
  const [showConfirm, setShowConfirm] = useState(false);

  const openModal = () => {
    setShowConfirm(true);
  };

  const closeModal = () => {
    setShowConfirm(false);
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
        <Text style={s.explanation}>자녀분 핸드폰을 통해 인증번호를 입력해주세요</Text>
      </View>

      <View style={{ marginTop: 12, alignItems: "flex-end" }}>
        <Pressable onPress={openModal} style={s.modalButton}>
          <Text style={s.modalButtonText}>모달 확인</Text>
        </Pressable>
      </View>

      <View style={s.recertification}>
        <Text style={s.recertificationText}>인증번호 다시 받기</Text>
      </View>

      {showConfirm && (
        <>
          <Pressable style={s.overlay} onPress={closeModal}>
            <View
              style={[s.bottomSheet]}
            >
              <Text style={s.sheetTitle}>자녀분이 맞으신가요?</Text>

              <View style={s.userCard}>
                <View style={s.textarray}>
                  <Text style={s.name}>김유찬</Text>
                  <Text style={s.specialsymbol}>|</Text>
                  <Text style={s.age}>23세</Text>
                </View>
                <Text style={s.phone}>010-4610-3405</Text>
              </View>

              <View style={s.row}>
                <Pressable style={s.cancelButton} onPress={closeModal}>
                  <Text style={s.cancel}>아니요</Text>
                </Pressable>

                <Pressable
                  onPress={() => router.push("/(parent)/onboarding/success")}
                  style={s.okButton}
                >
                  <Text style={s.ok}>맞아요</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
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
    marginBottom: 60,
  },
  myCodeCard: {
    alignItems: "center",
    marginBottom: 20,
    gap: 20,
  },
  myCodeLabel: { fontSize: 16, color: COLORS.text, fontWeight: "600" },
  myCodeText: {
    fontSize: 32,
    lineHeight: 40,
    color: COLORS.text,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop:4,
  },
  explanation: {
    fontSize: 14,
    fontWeight: "600",
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
  recertification: {
    backgroundColor:"#1E8FFF",
    marginTop: "auto",
    marginBottom: 58,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:14,
  },
  recertificationText: {
    fontSize: 20,
    fontWeight: 600,
    color: "#FFFFFF",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center", 
  },
  bottomSheet: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 14,
  },
  userCard: {
    backgroundColor:"#F5F5F5",
    borderRadius: 12,
    padding: 8,
    paddingLeft: 20,
    marginBottom: 36,
    justifyContent: "space-between",
  },
  textarray: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  specialsymbol: {
    fontSize: 20,
    fontWeight: "300",
    paddingLeft:12,
    paddingRight:12,
  },
  age: {
    fontSize: 15,
    fontWeight: "500",
  },
  phone: {
    marginTop: 9,
    fontSize: 16,
    fontWeight: "500",
    color: "#7B7B7B",
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
    padding:10,
    paddingLeft:49,
    paddingRight:49,
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
    padding:10,
    paddingLeft:49,
    paddingRight:49,
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
