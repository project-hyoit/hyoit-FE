import ChildList from "@/entities/user/ui/ChildList";
import ProfileSection from "@/entities/user/ui/ProfileSection";
import { ScrollView, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const children = [
    {
      id: "1",
      name: "김유찬",
      phone: "010-4610-3404",
      isOnline: true,
    },
    // 나중에 여기 계속 추가됨
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileSection />
      <ChildList>{children}</ChildList>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
});
