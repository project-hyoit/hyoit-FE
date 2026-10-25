import { logout, useAuthStore } from "@hyoit/auth";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LogoutModal from "@/src/shared/ui/profile/LogoutModal";
import { useCheckInStore } from "@/src/shared/entities/check-in";
import { IconSymbol } from "@/src/shared/ui/IconSymbol";
import {
  toProfileViewModel,
  useProfileQuery,
} from "@/src/shared/entities/user";
import { ChildList, ProfileSection } from "../../entities/user";
import { useFamilyMembersQuery } from "@/src/shared/entities/family";
import ProfileSettings from "@/src/shared/ui/profile/ProfileSettings";

export default function ProfilePage() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const clearCheckIns = useCheckInStore((state) => state.clearCheckIns);
  const { data: profileData, isLoading: isProfileLoading } = useProfileQuery();
  const { data: familyMembers = [] } = useFamilyMembersQuery();

  const profile = profileData ? toProfileViewModel(profileData) : null;
  const children = familyMembers
    .filter((member) => member.role === "USER")
    .map((member) => ({
      id: String(member.id),
      name: member.nickname,
      phone: member.phoneNumber ?? "",
      isOnline: member.online,
    }));

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      await clearCheckIns();
      resetAuth();
      setIsLogoutModalOpen(false);
      router.replace("/(entry)/login");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.topCard}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>내 정보</Text>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/(parent)/(tabs)/check-in")}
          >
            <IconSymbol name="bell" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {profile ? (
          <ProfileSection
            user={profile}
            onPressEdit={() => router.push("/(parent)/(tabs)/profile/edit")}
            onPressModify={() => router.push("/(parent)/(tabs)/profile/edit")}
          />
        ) : (
          <Text style={styles.statusText}>
            {isProfileLoading ? "프로필을 불러오는 중이에요." : "프로필을 불러오지 못했어요."}
          </Text>
        )}

        <ChildList items={children} />

        <ProfileSettings
          onPressNotification={() =>
            router.push("/(parent)/(tabs)/profile/notification" as never)
          }
          onPressChangePhoto={() => router.push("/(parent)/(tabs)/profile/edit")}
          onPressHelp={() => undefined}
          onPressLogout={() => setIsLogoutModalOpen(true)}
        />

        <LogoutModal
          visible={isLogoutModalOpen}
          onConfirm={handleLogout}
          onCancel={() => setIsLogoutModalOpen(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  container: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 16,
    backgroundColor: "#F8F9FB",
  },
  topCard: {
    alignSelf: "stretch",
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 0,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Pretendard",
  },
  iconButton: {
    position: "absolute",
    right: 0,
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    paddingVertical: 72,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 16,
    fontWeight: "600",
  },
});
