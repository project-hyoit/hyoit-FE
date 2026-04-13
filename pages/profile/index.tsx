import { mockChildUsers, mockUserProfile } from "@/entities/user/model/mock";
import ChildList from "@/entities/user/ui/ChildList";
import Header from "@/shared/ui/section/header";
import ProfileSection from "@/widgets/profile/profile-section";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ProfilePage() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Header title="프로필" icon="person.fill" />
        <ProfileSection user={mockUserProfile} />
        <ChildList items={mockChildUsers} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 16,
  },
});
