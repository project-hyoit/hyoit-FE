import { useQuery } from "@tanstack/react-query";
import { getFamilyMembers } from "../api/family";

export const familyMembersQueryKey = ["family-members"] as const;

export function useFamilyMembersQuery() {
  return useQuery({
    queryKey: familyMembersQueryKey,
    queryFn: () => getFamilyMembers(),
  });
}
