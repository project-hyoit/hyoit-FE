import { useChooseRoleAction } from "@hyoit/auth";
import { useState, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View} from "react-native";

import oldManImg from "@/src/entry/assets/images/choose/oldman.png";
import oldWomanImg from "@/src/entry/assets/images/choose/oldwoman.png";
import youngManImg from "@/src/entry/assets/images/choose/youngman.png";
import youngWomanImg from "@/src/entry/assets/images/choose/youngwoman.png";

import { BG, PRIMARY, TEXT } from "../../shared/config/theme";
import { navigateToTarget } from "../../shared/lib/router";
import ProgressBar from "../../../shared/ui/ProgressBar";
import { useOnboardingStore } from "@/src/shared/entities/onboarding/model/onboarding.store";

type SelectedRole = "parent" | "child" | null;

export default function ChoosePage() {
  const [selectedRole, setSelectedRole] = useState<SelectedRole>(null);
  const setStore = useOnboardingStore((s) => s.set);

  useEffect(() => {
    setStore({ step: 1 });
  }, [setStore]);

  const { submit, isPending, error } = useChooseRoleAction({
    onSuccess: (result) => {
      if (result.role === "parent") {
        navigateToTarget("parent");
        return;
      }

      navigateToTarget("child");
    },
  });

  const handleConfirm = () => {
    if (!selectedRole || isPending) return;
    submit(selectedRole);
  };

  return (
    <View style={styles.container}>
      <ProgressBar current={1} total={4} />
      <Text style={styles.title}>어떤 분이 효잇을 사용하시나요?</Text>
        <View style={styles.index}>
          <Pressable
            style={[
              styles.roleButton,
              selectedRole === "parent" && styles.selectedButton,
            ]}
            onPress={() => setSelectedRole("parent")}
          >
            <Text
              style={[
                styles.roleText,
                selectedRole === "parent" && styles.selectedRoleText,
              ]}
            >
              부모님
            </Text>
            <Text style={styles.subtitle}>큰 글씨와 간단한 버튼!</Text>
            <View style={styles.imagearray}>
              <Image style={styles.img} source={oldWomanImg} />
              <Image style={styles.img} source={oldManImg} />
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.roleButton,
              selectedRole === "child" && styles.selectedButton,
            ]}
            onPress={() => setSelectedRole("child")}
          >
            <Text
              style={[
                styles.roleText,
                selectedRole === "child" && styles.selectedRoleText,
              ]}
            >
              자녀
            </Text>
            <Text style={styles.subtitle}>큰 글씨와 간단한 버튼!</Text>
            <View style={styles.imagearray}>
              <Image style={styles.img} source={youngWomanImg} />
              <Image style={styles.img} source={youngManImg} />
            </View>
          </Pressable>
        </View>
      <Pressable
        style={[
          styles.confirmButton,
          selectedRole && !isPending && styles.activeConfirmButton,
        ]}
        onPress={handleConfirm}
        disabled={!selectedRole || isPending}
      >
        <Text style={styles.confirmText}>
          {isPending ? "처리 중..." : "확인"}
        </Text>
      </Pressable>

      {error ? (
        <Text style={styles.errorText}>역할 선택에 실패했어요.</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 24,
    paddingTop: 110,
    alignItems: "center",
  },
  title: {
    marginTop:41,
    marginBottom: 59,
    fontSize: 24,
    fontWeight: "700",
  },
  index:{
    gap:14,
    width: "100%",
  },
  roleButton: {
    padding: 8,
    paddingVertical: 20, 
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: "#FFFFFF",
  },
  imagearray: {
    flexDirection: "row",
  },
  selectedButton: {
    borderColor: PRIMARY,
    backgroundColor: "#EEF6FF",
  },
  roleText: {
    color: TEXT,
    fontSize: 20,
    fontWeight: "600",
  },
  subtitle: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 12,
    marginTop: 16,
    marginBottom: 14,
  },
  selectedRoleText: {
    color: PRIMARY,
    fontWeight: "700",
  },
  confirmButton: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 64,
    width: "100%",
  },
  activeConfirmButton: {
    backgroundColor: PRIMARY,
  },
  confirmText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  errorText: {
    marginTop: 12,
    color: "#FF4757",
    fontSize: 14,
    textAlign: "center",
  },
  img: {
    width: 70,
    height: 57,
    resizeMode: "contain",
  },
});
