import { logout, useAuthStore } from "@hyoit/auth";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileMenu from "@/src/parent/features/edit-profile/ui/ProfileMenu";
import LogoutModal from "@/src/parent/features/logout/ui/LogoutModal";
import { useCheckInStore } from "@/src/shared/entities/check-in";
import { IconSymbol } from "@/src/shared/ui/IconSymbol";
import { ChildList, mockChildUsers, ProfileSection, useUserProfileStore } from "../../entities/user";
import ProfileSettings from "./ui/ProfileSettings";

export default function ProfilePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const clearCheckIns = useCheckInStore((state) => state.clearCheckIns);
  const profile = useUserProfileStore((state) => state.profile);

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
        <ProfileSection
          user={profile}
          onPressEdit={() => undefined}
          onPressModify={() => router.push("/(parent)/(tabs)/profile/edit")}
        />

        <ChildList items={mockChildUsers} />

        <ProfileSettings
          onPressNotification={() => undefined}
          onPressChangePhoto={() => setIsMenuOpen(true)}
          onPressHelp={() => undefined}
          onPressLogout={() => setIsLogoutModalOpen(true)}
        />

        <ProfileMenu
          visible={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onSelectAlbum={() => setIsMenuOpen(false)}
          onDefault={() => setIsMenuOpen(false)}
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
});
