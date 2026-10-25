import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mainQueryKey } from "@/src/shared/entities/main";
import {
  checkAnbu,
  getAnbuHistory,
  getCurrentAnbus,
  sendAnbu,
} from "../api/notification";
import type { SendAnbuRequest } from "@hyoit/types";

export const anbuHistoryQueryKey = ["anbu-history"] as const;
export const currentAnbuQueryKey = ["current-anbu"] as const;

export function useAnbuHistoryQuery(partnerId?: number) {
  return useQuery({
    queryKey: [...anbuHistoryQueryKey, partnerId ?? null],
    queryFn: () => getAnbuHistory({ partnerId, filter: "ALL" }),
  });
}

export function useCurrentAnbusQuery() {
  return useQuery({
    queryKey: currentAnbuQueryKey,
    queryFn: () => getCurrentAnbus(),
  });
}

export function useSendAnbuMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SendAnbuRequest) => sendAnbu(request),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: anbuHistoryQueryKey });
      void queryClient.invalidateQueries({ queryKey: currentAnbuQueryKey });
      void queryClient.invalidateQueries({ queryKey: mainQueryKey });
    },
  });
}

export function useCheckAnbuMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => checkAnbu(notificationId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: anbuHistoryQueryKey });
      void queryClient.invalidateQueries({ queryKey: currentAnbuQueryKey });
      void queryClient.invalidateQueries({ queryKey: mainQueryKey });
    },
  });
}
