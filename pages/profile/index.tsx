import { ScrollView } from "react-native";
import ChildList from "../../entities/user/ui/ChildList";
import ProfileSection from "../../entities/user/ui/ProfileSection";

export default function ProfileScreen() {
  return (
    <ScrollView>
      <ProfileSection />
      <ChildList />
    </ScrollView>
  );
}
