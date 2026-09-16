import mainProfileImg from "@/assets/images/profile-avatars/mainprofile.png";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
  name: string;
  phone: string;
}

export default function ConnectedChildCard({ name, phone }: Props) {
  return (
    <View style={s.card}>
      <Image source={mainProfileImg} style={s.avatar} />

      <Text style={s.childName} allowFontScaling={false}>
        {name}
      </Text>

      <Text style={s.childPhone} allowFontScaling={false}>
        {phone}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 12,
    borderColor: "#BCE1FF",
  },
  childName: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 24,
    fontWeight: "600",
  },
  childPhone: {
    fontSize: 16,
    fontWeight: "500",
  },
});
