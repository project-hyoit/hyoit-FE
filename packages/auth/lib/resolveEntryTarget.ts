// entry 앱이 지금 어디로 보내야 하는지 판단하는 함수

export type EntryTarget = "login" | "choose" | "parent" | "child";

interface ResolveEntryTargetParams {
  authenticated: boolean;
  role?: "parent" | "child" | null;
}

export function resolveEntryTarget({
  authenticated,
  role,
}: ResolveEntryTargetParams): EntryTarget {
  if (!authenticated) {
    return "login";
  }

  if (!role) {
    return "choose";
  }

  if (role === "parent") {
    return "parent";
  }

  return "child";
}
