import { clearToken } from "@hyoit/storage";

export async function logout(): Promise<void> {
  // TODO: 실제 로그아웃 API로 교체
  await new Promise<void>((resolve) => setTimeout(resolve, 150));
  await clearToken();
}
