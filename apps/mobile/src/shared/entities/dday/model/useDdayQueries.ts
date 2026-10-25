import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mainQueryKey } from "@/src/shared/entities/main";
import {
  createDday,
  deleteDday,
  getDdayList,
  updateDday,
} from "../api/dday";
import type { DdayRequest } from "@hyoit/types";

export const ddayQueryKey = ["ddays"] as const;

export function useDdayListQuery() {
  return useQuery({
    queryKey: ddayQueryKey,
    queryFn: () => getDdayList(),
  });
}

export function useCreateDdayMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: DdayRequest) => createDday(request),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ddayQueryKey });
      void queryClient.invalidateQueries({ queryKey: mainQueryKey });
    },
  });
}

export function useUpdateDdayMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: DdayRequest }) =>
      updateDday(id, request),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ddayQueryKey });
      void queryClient.invalidateQueries({ queryKey: mainQueryKey });
    },
  });
}

export function useDeleteDdayMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteDday(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ddayQueryKey });
      void queryClient.invalidateQueries({ queryKey: mainQueryKey });
    },
  });
}
