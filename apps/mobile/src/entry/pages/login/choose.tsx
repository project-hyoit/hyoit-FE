import { useChooseRoleAction } from "@hyoit/auth";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { BG, PRIMARY, TEXT } from "../../shared/config/theme";
import { navigateToTarget } from "../../shared/lib/router";

type SelectedRole = "parent" | "child" | null;

export default function ChoosePage() {
  const [selectedRole, setSelectedRole] = useState<SelectedRole>(null);

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
      <Text style={styles.title}>역할을 선택해주세요</Text>

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

        <Image
          style={styles.oldwoman}
          source={require("@/assets/images/choose/oldwoman.png")}
        />
        <Image
          style={styles.oldman}
          source={require("@/assets/images/choose/oldman.png")}
        />
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

        <Image
          style={styles.youngwoman}
          source={require("@/assets/images/choose/youngwoman.png")}
        />
        <Image
          style={styles.youngman}
          source={require("@/assets/images/choose/youngman.png")}
        />
      </Pressable>

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
  },
  title: {
    marginTop: 97,
    marginBottom: 98,
    fontSize: 26,
    fontWeight: "600",
    color: TEXT,
  },
  roleButton: {
    padding: 30,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    marginBottom: 40,
    backgroundColor: "#FFFFFF",
  },
  selectedButton: {
    borderColor: PRIMARY,
    backgroundColor: "#EEF6FF",
  },
  roleText: {
    marginLeft: 42,
    color: TEXT,
    fontSize: 16,
    fontWeight: "500",
  },
  selectedRoleText: {
    color: PRIMARY,
    fontWeight: "700",
  },
  confirmButton: {
    marginTop: 149,
    backgroundColor: "#D9D9D9",
    paddingVertical: 14,
    borderRadius: 10,
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
  oldwoman: {
    width: 76,
    height: 57,
    resizeMode: "contain",
    marginLeft: 46,
  },
  oldman: {
    width: 70,
    height: 57,
    resizeMode: "contain",
    marginLeft: 16,
  },
  youngwoman: {
    width: 70,
    height: 65,
    resizeMode: "contain",
    marginLeft: 69,
  },
  youngman: {
    width: 70,
    height: 57,
    resizeMode: "contain",
    marginLeft: 16,
  },
});
