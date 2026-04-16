import type { Me } from "@hyoit/types";

export async function getMe(): Promise<Me> {
  // TODO: 실제 내 정보 조회 API로 교체
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    id: 1,
    name: "효잇 사용자",
    role: null,
  };
}
