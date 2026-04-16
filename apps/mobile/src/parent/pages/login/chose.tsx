import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from "react-native";

export default function Chose() {
  const [selectedRole, setSelectedRole] = useState<"parent" | "child" | null>(null);

  const checkRole = () => {
    if (!selectedRole) return;

    if (selectedRole === "parent") {
      router.replace("/onboarding/user-info");
    } else {
      router.replace("/onboarding/admin");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>역할을 선택해주세요</Text>

      <Pressable
        style={[
          styles.roleButton,
          selectedRole === "parent" && styles.selectedButton
        ]}
        onPress={() => setSelectedRole("parent")}
      >
        <Text
          style={[
            styles.roleText,
            selectedRole === "parent" && styles.selectedText
          ]}
        >
          부모님
        </Text>
        <Image style={styles.oldwoman} source={require("@/assets/chose/oldwoman.png")} />
        <Image style={styles.oldman} source={require("@/assets/chose/oldman.png")} />
      </Pressable>

      <Pressable
        style={[
          styles.roleButton,
          selectedRole === "child" && styles.selectedButton
        ]}
        onPress={() => setSelectedRole("child")}
      >
        <Text
          style={[
            styles.roleText,
            selectedRole === "child" && styles.selectedText
          ]}
        >
          자녀
        </Text>
        <Image style={styles.youngwoman} source={require("@/assets/chose/youngwoman.png")} />
        <Image style={styles.youngman} source={require("@/assets/chose/youngman.png")} />
      </Pressable>

      <Pressable
        style={[
          styles.checkButton,
          selectedRole && styles.activeButton
        ]}
        onPress={checkRole}
        disabled={!selectedRole}
      >
        <Text style={styles.checkText}>확인</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 24,
    marginRight: 24
  },
  title: {
    marginTop: 97,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 98,
  },
  roleButton: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    marginBottom: 40,
  },
  selectedButton: {
    borderColor: '#1E8FFF',
    backgroundColor: '#1E8FFF',
  },
  roleText: {
    marginLeft: 42,
    color: 'black',
    fontSize: 16,
  },
  selectedText: {
    color: 'white',
  },
  checkButton: {
    marginTop: 149,
    backgroundColor: '#D9D9D9',
    padding: 14,
    borderRadius: 10,
  },
  activeButton: {
    backgroundColor: '#1E8FFF',
  },
  checkText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  oldwoman: {
    width: 76,
    height: 57,
    resizeMode: 'contain',
    marginLeft: 46,
  },
  oldman: {
    width: 70,
    height: 57,
    resizeMode: 'contain',
    marginLeft: 16,
  },
  youngwoman: {
    width: 70,
    height: 65,
    resizeMode: 'contain',
    marginLeft: 69,
  },
  youngman: {
    width: 70,
    height: 57,
    resizeMode: 'contain',
    marginLeft: 16,
  },
});