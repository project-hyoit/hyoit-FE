import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import IconProfile from "../../../components/profilecomponets.js";
import IconMainprofile from "../../../components/mainprofilecomponets.js";
import Iconcorrection from "../../../components/correctioncomponets.js";
import LogoutModal from '../model/LogoutModal';
import ProfileMenu from '../model/ProfileMenu.jsx';

const user = {
  name: "김유찬",
  age: "60",
  phone: "010-4610-3405",
};

export default function ProfileCard() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogoutPress = () => setIsLogoutModalOpen(true);
  const handleConfirmLogout = () => setIsLogoutModalOpen(false);
  const handleCancelLogout = () => setIsLogoutModalOpen(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconProfile style={styles.profileImg} />
        <Text style={styles.title}>프로필</Text>
      </View>
      <View style={styles.avatarWrapper}>
        <IconMainprofile style={styles.avatar} />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsMenuOpen(true)}
        >
          <Iconcorrection style={{ width: 38, height: 38 }} />
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
});