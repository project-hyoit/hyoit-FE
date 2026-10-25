import { useQuery } from "@tanstack/react-query";
import { getMain } from "../api/getMain";

export const mainQueryKey = ["main"] as const;

export function useMainQuery() {
  return useQuery({
    queryKey: mainQueryKey,
    queryFn: () => getMain(),
  });
}
