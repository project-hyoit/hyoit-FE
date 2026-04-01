import ProfileMenu from "@/features/edit-profile/ui/ProfileMenu";
import LogoutModal from "@/features/logout/ui/LogoutModal";
import { IconSymbol } from "@/shared/ui/IconSymbol";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  user: {
    name: string;
    age: string;
    phone: string;
  };
}

export default function ProfileSection({ user }: Props) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoutPress = () => setIsLogoutModalOpen(true);
  const handleConfirmLogout = () => setIsLogoutModalOpen(false);
  const handleCancelLogout = () => setIsLogoutModalOpen(false);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconSymbol
            name="person.fill"
            color="#000"
            style={styles.profileImg}
          />
          <Text style={styles.title}>프로필</Text>
        </View>

        <View style={styles.avatarWrapper}>
          <Image
            source={require("@/assets/profileimg/mainprofile.png")}
            style={styles.avatar}
          />

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsMenuOpen(true)}
          >
            <View style={styles.editIconCircle}>
              <IconSymbol name="pencil" size={18} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{user.name}</Text>

        <View style={styles.info}>
          <Text style={styles.infoText}>{user.age}세</Text>
          <Text style={styles.infoText}>{user.phone}</Text>
        </View>

        <TouchableOpacity style={styles.logout} onPress={handleLogoutPress}>
          <Text style={styles.logouttext}>로그아웃</Text>
        </TouchableOpacity>

        <LogoutModal
          visible={isLogoutModalOpen}
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />

        <ProfileMenu
          visible={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onSelectAlbum={() => {
            setIsMenuOpen(false);
          }}
          onDefault={() => {
            setIsMenuOpen(false);
          }}
        />
      </View>

      <Text style={styles.bordertext}>연결된 자녀분</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 58,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
  },

  profileImg: {
    width: 24,
    height: 24,
  },

  title: {
    marginLeft: 8,
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "bold",
  },

  avatarWrapper: {
    position: "relative",
    marginTop: 24,
  },

  avatar: {
    width: 160,
    height: 160,
  },

  editButton: {
    position: "absolute",
    right: 5,
    bottom: 5,
  },

  editIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontFamily: "Pretendard",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 24,
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },

  infoText: {
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "600",
  },

  logout: {
    marginTop: 16,
    paddingHorizontal: 12,
    height: 26,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    elevation: 2,
  },

  logouttext: {
    fontSize: 12,
  },

  bordertext: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Pretendard",
    marginLeft: 28,
  },
});
