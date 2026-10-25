import { apiClient, unwrapApiResponse } from "@hyoit/api";
import type {
  ApiResponse,
  FamilyMember,
  InvitationPreview,
} from "@hyoit/types";

export async function getInvitationCode(client = apiClient): Promise<string> {
  const response = await client.get<ApiResponse<string>>(
    "/api/family/invitation-code",
  );
  const code = unwrapApiResponse(response.data);

  if (!code) throw new Error("초대 코드 응답 데이터가 없습니다.");
  return code;
}

export async function previewFamilyConnection(
  invitationCode: string,
  client = apiClient,
): Promise<InvitationPreview> {
  const response = await client.get<ApiResponse<InvitationPreview>>(
    "/api/family/preview",
    { params: { invitationCode } },
  );
  const preview = unwrapApiResponse(response.data);

  if (!preview) throw new Error("가족 연결 미리보기 응답이 없습니다.");
  return preview;
}

export async function connectFamily(
  invitationCode: string,
  client = apiClient,
): Promise<null | undefined> {
  const response = await client.post<ApiResponse<null>>(
    "/api/family/connect",
    { invitationCode },
  );
  return unwrapApiResponse(response.data);
}

export async function getFamilyMembers(
  client = apiClient,
): Promise<FamilyMember[]> {
  const response = await client.get<ApiResponse<FamilyMember[]>>(
    "/api/family/members",
  );
  return unwrapApiResponse(response.data) ?? [];
}

export async function removeFamilyMember(
  memberId: number,
  client = apiClient,
): Promise<null | undefined> {
  const response = await client.delete<ApiResponse<null>>(
    `/api/family/members/${memberId}`,
  );
  return unwrapApiResponse(response.data);
}
