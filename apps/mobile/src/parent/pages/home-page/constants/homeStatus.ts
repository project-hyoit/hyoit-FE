import type { HomeStatus } from "../types/home";

type HomeStatusContent = {
  label: string | null;
  title: string;
  description: string;
  ctaLabel: string;
  badgeText: string | null;
  badgeColor: string | null;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  descriptionColor: string;
  ctaColor: string;
};

export const HOME_STATUS_CONTENT: Record<HomeStatus, HomeStatusContent> = {
  received: {
    label: null,
    title: "자녀가\n안부를 보냈어요!",
    description: "지금 확인하고\n간단히 답장해볼까요?",
    ctaLabel: "바로 확인하러 가기 >",
    badgeText: "N",
    badgeColor: "#FF5C72",
    backgroundColor: "#EEF5FF",
    borderColor: "#CFE1FF",
    textColor: "#0B234A",
    descriptionColor: "#777777",
    ctaColor: "#1478FF",
  },

  empty: {
    label: null,
    title: "새로 도착한\n안부가 없어요!",
    description: "한번 먼저 안부를\n보내볼까요?",
    ctaLabel: "바로 보내러 가기 >",
    badgeText: null,
    badgeColor: null,
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    textColor: "#050505",
    descriptionColor: "#777777",
    ctaColor: "#1478FF",
  },

  multiple: {
    label: "새 안부 2개",
    title: "자녀가\n여러개의 안부를 보냈어요!",
    description: "어서 확인해보세요.",
    ctaLabel: "바로 확인하러 가기 >",
    badgeText: null,
    badgeColor: null,
    backgroundColor: "#F3EEFF",
    borderColor: "#D8C8FF",
    textColor: "#050505",
    descriptionColor: "#777777",
    ctaColor: "#6D45C7",
  },

  sent: {
    label: null,
    title: "안부를 보냈어요!",
    description: "자녀가 아직 확인하지 않았어요",
    ctaLabel: "바로 확인하러 가기 >",
    badgeText: null,
    badgeColor: null,
    backgroundColor: "#EEFFF4",
    borderColor: "#CDEFD7",
    textColor: "#050505",
    descriptionColor: "#6B7A70",
    ctaColor: "#3A8F59",
  },

  checked: {
    label: null,
    title: "자녀가 확인했어요!",
    description: "보낸 안부를 자녀가 확인했어요",
    ctaLabel: "바로 확인하러 가기 >",
    badgeText: "✓",
    badgeColor: "#36A266",
    backgroundColor: "#EEFFF4",
    borderColor: "#CDEFD7",
    textColor: "#050505",
    descriptionColor: "#6B7A70",
    ctaColor: "#3A8F59",
  },
};


export const resolveHomeStatusLabel = (
  status: HomeStatus,
  pendingReceivedCount: number,
) => {
  if (status !== "multiple") return HOME_STATUS_CONTENT[status].label;
  return `새 안부 ${pendingReceivedCount}개`;
};
