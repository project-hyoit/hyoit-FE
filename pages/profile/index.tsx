import { ScrollView, Text } from "react-native";
import ProfileSection from "../../entities/user/ui/ProfileSection";
import ChildList from "../../entities/user/ui/ChildList";

export default function ProfileScreen() {
  return (
    <ScrollView>
      <ProfileSection />
      <ChildList />
    </ScrollView>
  );
}