import ChildList from "@/entities/user/ui/ChildList";
import ProfileSection from "@/widgets/profile/profile-section";
import { ScrollView, StyleSheet } from "react-native";

export default function ProfilePage() {
  const user = {
    name: "김유찬",
    age: "60",
    phone: "010-4610-3405",
  };

  const childUsers = [
    {
      id: "1",
      name: "김유찬",
      phone: "010-4610-3404",
      isOnline: true,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileSection user={user} />
      <ChildList items={childUsers} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
});
