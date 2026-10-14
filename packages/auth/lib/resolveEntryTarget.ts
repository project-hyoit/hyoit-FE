// entry 앱이 지금 어디로 보내야 하는지 판단하는 함수

export type EntryTarget = "login" | "choose" | "parent" | "child";

interface ResolveEntryTargetParams {
  authenticated: boolean;
  firstLogin?: boolean;
  role?: "parent" | "child" | null;
}

export function resolveEntryTarget({
  authenticated,
  firstLogin = false,
  role,
}: ResolveEntryTargetParams): EntryTarget {
  if (!authenticated) {
    return "login";
  }

  if (firstLogin) {
    return "choose";
  }

  if (!role) {
    return "choose";
  }

  if (role === "parent") {
    return "parent";
  }

  return "child";
}
