import { mockChildUsers, mockUserProfile } from "@/entities/user/model/mock";
import ChildList from "@/entities/user/ui/ChildList";
import ProfileSection from "@/widgets/profile/profile-section";
import { ScrollView, StyleSheet } from "react-native";

export default function ProfilePage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileSection user={mockUserProfile} />
      <ChildList items={mockChildUsers} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
});
