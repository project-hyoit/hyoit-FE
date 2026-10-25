import { apiClient, unwrapApiResponse } from "@hyoit/api";
import type {
  AnbuFilter,
  ApiResponse,
  NotificationItem,
  NotificationSettings,
  NotificationSettingsPatch,
  NotificationSummary,
  SendAnbuRequest,
} from "@hyoit/types";

export interface NotificationHistoryQuery {
  partnerId?: number;
}

export interface AnbuHistoryQuery extends NotificationHistoryQuery {
  filter?: AnbuFilter;
}

export async function getNotificationSettings(
  client = apiClient,
): Promise<NotificationSettings> {
  const response = await client.get<ApiResponse<NotificationSettings>>(
    "/api/notification-settings",
  );
  const settings = unwrapApiResponse(response.data);

  if (!settings) throw new Error("알림 설정 응답 데이터가 없습니다.");
  return settings;
}

export async function updateNotificationSettings(
  request: NotificationSettingsPatch,
  client = apiClient,
): Promise<NotificationSettings> {
  const response = await client.patch<ApiResponse<NotificationSettings>>(
    "/api/notification-settings",
    request,
  );
  const settings = unwrapApiResponse(response.data);

  if (!settings) throw new Error("알림 설정 응답 데이터가 없습니다.");
  return settings;
}

export async function sendAnbu(
  request: SendAnbuRequest,
  client = apiClient,
): Promise<NotificationItem> {
  const response = await client.post<ApiResponse<NotificationItem>>(
    "/api/notifications/anbu",
    request,
  );
  const notification = unwrapApiResponse(response.data);

  if (!notification) throw new Error("안부 응답 데이터가 없습니다.");
  return notification;
}

export async function getNotificationHistory(
  query: NotificationHistoryQuery = {},
  client = apiClient,
): Promise<NotificationItem[]> {
  const response = await client.get<ApiResponse<NotificationItem[]>>(
    "/api/notifications",
    { params: query },
  );
  return unwrapApiResponse(response.data) ?? [];
}

export async function getAnbuHistory(
  query: AnbuHistoryQuery = {},
  client = apiClient,
): Promise<NotificationItem[]> {
  const response = await client.get<ApiResponse<NotificationItem[]>>(
    "/api/notifications/anbu",
    { params: query },
  );
  return unwrapApiResponse(response.data) ?? [];
}

export async function getCurrentAnbus(
  client = apiClient,
): Promise<NotificationItem[]> {
  const response = await client.get<ApiResponse<NotificationItem[]>>(
    "/api/notifications/anbu/current",
  );
  return unwrapApiResponse(response.data) ?? [];
}

export async function checkAnbu(
  notificationId: number,
  client = apiClient,
): Promise<NotificationItem> {
  const response = await client.patch<ApiResponse<NotificationItem>>(
    `/api/notifications/anbu/${notificationId}/check`,
  );
  const notification = unwrapApiResponse(response.data);

  if (!notification) throw new Error("안부 확인 응답 데이터가 없습니다.");
  return notification;
}

export async function getNotificationSummary(
  client = apiClient,
): Promise<NotificationSummary> {
  const response = await client.get<ApiResponse<NotificationSummary>>(
    "/api/notifications/summary",
  );
  const summary = unwrapApiResponse(response.data);

  if (!summary) throw new Error("알림 요약 응답 데이터가 없습니다.");
  return summary;
}
