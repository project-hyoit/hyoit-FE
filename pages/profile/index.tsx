import { ScrollView, Text } from "react-native";
import ProfileSection from "../../entities/user/ui/ProfileSection";
import ChildList from "../../entities/user/ui/ChildList";

export default function ProfileScreen() {
  return (
    <ScrollView>
      <ProfileSection />

      <Text style={{ marginTop: 8, fontSize: 16, fontWeight: "700", fontFamily: "Pretendard", marginLeft: 28 }}>
        연결된 자녀분
      </Text>

      <ChildList />
    </ScrollView>
  );
}