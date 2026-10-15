export interface KakaoOAuthToken {
  accessToken?: string;
}

export type KakaoLogin = () => Promise<KakaoOAuthToken>;

export async function getKakaoAccessToken(
  login?: KakaoLogin,
): Promise<string> {
  const loginWithKakao =
    login ?? (await import("@react-native-seoul/kakao-login")).login;
  const token = await loginWithKakao();

  if (!token.accessToken?.trim()) {
    throw new Error("카카오 access token을 받지 못했습니다.");
  }

  return token.accessToken;
}
