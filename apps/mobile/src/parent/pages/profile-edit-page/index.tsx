import mainProfileImg from "@/assets/images/profile-avatars/mainprofile.png";
import { useOnboardingStore } from "@/src/shared/entities/onboarding/model/onboarding.store";
import { useUserProfileStore } from "@/src/parent/entities/user";
import { IconSymbol } from "@/src/shared/ui/IconSymbol";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MIN_AGE = 1;
const MAX_AGE = 100;
const AGE_OPTIONS = Array.from({ length: MAX_AGE }, (_, index) =>
  String(index + MIN_AGE),
);
const AGE_OPTION_HEIGHT = 52;

const normalizeAge = (value?: string) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return "60";
  }

  return String(Math.min(Math.max(parsed, MIN_AGE), MAX_AGE));
};

export default function ProfileEditPage() {
  const profile = useUserProfileStore((state) => state.profile);
  const updateProfile = useUserProfileStore((state) => state.updateProfile);
  const onboardingAge = useOnboardingStore((state) => state.age);
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(() =>
    normalizeAge(profile.age || onboardingAge),
  );
  const [avatarUri, setAvatarUri] = useState(profile.avatarUri);
  const [isAgePickerOpen, setIsAgePickerOpen] = useState(false);
  const ageScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!isAgePickerOpen) {
      return;
    }

    const selectedIndex = Math.max(AGE_OPTIONS.indexOf(age), 0);
    const timer = setTimeout(() => {
      ageScrollRef.current?.scrollTo({
        y: selectedIndex * AGE_OPTION_HEIGHT,
        animated: false,
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [age, isAgePickerOpen]);

  const handlePickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "권한 필요",
          "프로필 사진을 변경하려면 사진 접근 권한이 필요해요.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setAvatarUri(result.assets[0]?.uri);
      }
    } catch {
      Alert.alert(
        "사진 선택 실패",
        "사진 선택 창을 열 수 없어요. 앱을 다시 실행한 뒤 시도해주세요.",
      );
    }
  };

  const handleSave = () => {
    updateProfile({
      name: name.trim() || profile.name,
      age,
      avatarUri,
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerIconButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <IconSymbol name="arrow.left" size={30} color="#34363D" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>프로필 수정</Text>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>저장</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarBackground} />
              <Image
                source={avatarUri ? { uri: avatarUri } : mainProfileImg}
                style={styles.avatar}
              />
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={handlePickImage}
                activeOpacity={0.8}
                hitSlop={12}
              >
                <IconSymbol name="camera" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.avatarHelpText}>
              프로필 사진을 변경할 수 있어요.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>이름</Text>
              <View style={styles.inputBox}>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  style={styles.inputText}
                  placeholder="이름"
                  placeholderTextColor="#A0A4AF"
                  returnKeyType="done"
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>나이</Text>
              <TouchableOpacity
                style={styles.selectBox}
                onPress={() => setIsAgePickerOpen(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.inputText}>{age}살</Text>
                <IconSymbol name="chevron.down" size={26} color="#171A20" />
              </TouchableOpacity>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>관계</Text>
              <TouchableOpacity style={styles.selectBox} activeOpacity={0.8}>
                <Text style={styles.inputText}>부모</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.withdrawButton} activeOpacity={0.8}>
            <Text style={styles.withdrawButtonText}>회원 탈퇴</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Modal visible={isAgePickerOpen} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsAgePickerOpen(false)}
          activeOpacity={1}
        >
          <View style={styles.ageSheet}>
            <View style={styles.ageSheetHeader}>
              <Text style={styles.ageSheetTitle}>나이 선택</Text>
              <TouchableOpacity onPress={() => setIsAgePickerOpen(false)}>
                <Text style={styles.ageSheetClose}>닫기</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              ref={ageScrollRef}
              style={styles.ageOptionList}
              showsVerticalScrollIndicator={false}
            >
              {AGE_OPTIONS.map((option) => {
                const selected = option === age;

                return (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.ageOption,
                      selected && styles.ageOptionSelected,
                    ]}
                    onPress={() => {
                      setAge(option);
                      setIsAgePickerOpen(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.ageOptionText,
                        selected && styles.ageOptionTextSelected,
                      ]}
                    >
                      {option}살
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FBFCFE",
    paddingHorizontal: 12,
  },
  header: {
    alignSelf: "stretch",
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ECEEF3",
    paddingHorizontal: 24,
    marginHorizontal: -12,
  },
  headerIconButton: {
    position: "absolute",
    left: 24,
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "800",
    color: "#111111",
  },
  saveButton: {
    position: "absolute",
    right: 24,
    minWidth: 64,
    height: 42,
    borderRadius: 16,
    backgroundColor: "#4D79F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#315FE9",
    shadowOpacity: 0.24,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  content: {
    paddingTop: 24,
    paddingBottom: 32,
  },
  avatarSection: {
    alignItems: "center",
  },
  avatarWrapper: {
    position: "relative",
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarBackground: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#F5F7FF",
    top: -10,
    left: -10,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  cameraButton: {
    position: "absolute",
    right: 8,
    bottom: 8,
    zIndex: 2,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1F3EA8",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  avatarHelpText: {
    marginTop: 18,
    fontSize: 14,
    fontWeight: "600",
    color: "#8E96A8",
  },
  form: {
    marginTop: 32,
    paddingHorizontal: 12,
    gap: 20,
  },
  fieldGroup: {
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2F333C",
  },
  inputBox: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E7E9EF",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  selectBox: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E7E9EF",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  inputText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333842",
    padding: 0,
  },
  withdrawButton: {
    marginTop: 68,
    marginHorizontal: 12,
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#FF8D8D",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  withdrawButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#F05757",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  ageSheet: {
    maxHeight: 360,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
  },
  ageSheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  ageSheetTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  ageSheetClose: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4D79F6",
  },
  ageOptionList: {
    maxHeight: AGE_OPTION_HEIGHT * 4,
  },
  ageOption: {
    height: AGE_OPTION_HEIGHT,
    borderRadius: 14,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  ageOptionSelected: {
    backgroundColor: "#EEF3FF",
  },
  ageOptionText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333842",
  },
  ageOptionTextSelected: {
    color: "#4D79F6",
  },
});
