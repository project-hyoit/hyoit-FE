import axios, {
  AxiosHeaders,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { normalizeApiError } from "./apiError.ts";

export const DEFAULT_HTTP_TIMEOUT_MS = 10_000;

export interface CreateHttpClientOptions {
  baseURL?: string;
  timeout?: number;
  getAccessToken?: () => Promise<string | null>;
}

function isAbsoluteUrl(url: string): boolean {
  return /^[a-z][a-z\d+.-]*:/i.test(url) || url.startsWith("//");
}

function isApiOriginRequest(config: InternalAxiosRequestConfig): boolean {
  const requestUrl = config.url;

  if (!requestUrl || !isAbsoluteUrl(requestUrl)) {
    return true;
  }

  if (!config.baseURL) {
    return false;
  }

  try {
    return new URL(requestUrl).origin === new URL(config.baseURL).origin;
  } catch {
    return false;
  }
}

export function createHttpClient(
  options: CreateHttpClientOptions = {},
): AxiosInstance {
  const client = axios.create({
    baseURL: options.baseURL,
    timeout: options.timeout ?? DEFAULT_HTTP_TIMEOUT_MS,
  });

  client.interceptors.request.use(async (config) => {
    const accessToken = await options.getAccessToken?.();
    const headers = AxiosHeaders.from(config.headers);

    if (
      accessToken &&
      !headers.has("Authorization") &&
      isApiOriginRequest(config)
    ) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    config.headers = headers;
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(normalizeApiError(error)),
  );

  return client;
}
