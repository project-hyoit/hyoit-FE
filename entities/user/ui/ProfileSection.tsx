import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
const profileImg = require("../../../assets/profileimg/profile.png");
const mainprofile = require("../../../assets/profileimg/mainprofile.png");
const correction = require("../../../assets/profileimg/correction.png");
const logout = require("../../../assets/profileimg/logout.png")

export default function ProfileCard() {
  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={profileImg} style={styles.profileImg} />
        <Text style={styles.title}>프로필</Text>
      </View>
      <View style={styles.avatarWrapper}>
        <Image source={mainprofile} style={styles.avatar} />

        <ImageBackground source={correction} style={styles.editButton}>
          <TouchableOpacity style={styles.editButton} />
        </ImageBackground>
      </View>

      <Text style={styles.name}>김유찬</Text>

      <View style={styles.info}>
        <Text>60세</Text>
        <Text style={styles.infoText2}>010-4610-3405</Text>
      </View>

      <TouchableOpacity style={styles.logout}>
        <Image source={logout} />
      </TouchableOpacity>
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
    display: "flex",
    width: "100%",
  },

  profileImg: {
    width: 24,
    height: 24,
    marginLeft: 28,
  },

  title: {
    textAlign: "left",
    marginLeft: 8,
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "bold",
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 160,
    height: 160,
  },

  editButton: {
    position: "absolute",
    width: 38,
    height: 38,
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
    fontFamily: "Pretendard",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "600",
    display: "flex",
  },

    infoText2: {
        marginLeft: 8,
    },

  logout: {
    marginTop: 8,
    width: 65,
    height: 26,
  },
});