import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import IconProfile from '../../../components/profilecomponets.js';
import IconMainprofile from '../../../components/mainprofilecomponets.js';
import Iconcorrection from '../../../components/correctioncomponets.js';

const user = {
  name: "김유찬",
  age : "60",
  phone: "010-4610-3405",
};


export default function ProfileCard() {
  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <IconProfile style={styles.profileImg} />
        <Text style={styles.title}>프로필</Text>
      </View>
      <View style={styles.avatarWrapper}>
        <IconMainprofile style={styles.avatar} />

        <Iconcorrection style={styles.editButton}>

        </Iconcorrection>
      </View>

      <Text style={styles.name}>{user.name}</Text>

      <View style={styles.info}>
        <Text>{user.age}세</Text>
        <Text style={styles.infoText2}>{user.phone}</Text>
      </View>

      <TouchableOpacity style={styles.logout}>
          <Text style={styles.logouttext}>로그아웃</Text>
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
    backgroundColor :"#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    elevation: 2,
  },

  logouttext: {
    marginLeft: 12,
    fontSize: 12,
  }
});