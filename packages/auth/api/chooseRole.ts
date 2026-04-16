import type { ChooseRoleResult, UserRole } from "@hyoit/types";

export async function chooseRole(role: UserRole): Promise<ChooseRoleResult> {
  // TODO: 실제 역할 선택 API로 교체
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    role,
  };
}
