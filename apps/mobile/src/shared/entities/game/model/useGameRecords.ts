import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mainQueryKey } from "@/src/shared/entities/main";
import { getGameRecords, saveGameRecord } from "../api/game";
import type { GameRecordRequest } from "@hyoit/types";

export const gameRecordsQueryKey = ["game-records"] as const;

export function useGameRecordsQuery() {
  return useQuery({
    queryKey: gameRecordsQueryKey,
    queryFn: () => getGameRecords(),
  });
}

export function useSaveGameRecordMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: GameRecordRequest) => saveGameRecord(request),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: gameRecordsQueryKey });
      void queryClient.invalidateQueries({ queryKey: mainQueryKey });
    },
  });
}
