import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getNotificationSettings,
  updateNotificationSettings,
} from "../api/notification";
import type { NotificationSettingsPatch } from "@hyoit/types";

export const notificationSettingsQueryKey = ["notification-settings"] as const;

export function useNotificationSettingsQuery() {
  return useQuery({
    queryKey: notificationSettingsQueryKey,
    queryFn: () => getNotificationSettings(),
  });
}

export function useUpdateNotificationSettingsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (patch: NotificationSettingsPatch) =>
      updateNotificationSettings(patch),
    onMutate: async (patch) => {
      await queryClient.cancelQueries({
        queryKey: notificationSettingsQueryKey,
      });
      const previous = queryClient.getQueryData(notificationSettingsQueryKey);

      queryClient.setQueryData(notificationSettingsQueryKey, (current) =>
        current ? { ...current, ...patch } : current,
      );

      return { previous };
    },
    onError: (_error, _patch, context) => {
      if (context?.previous) {
        queryClient.setQueryData(notificationSettingsQueryKey, context.previous);
      }
    },
    onSuccess: (settings) => {
      queryClient.setQueryData(notificationSettingsQueryKey, settings);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: notificationSettingsQueryKey,
      });
    },
  });
}
