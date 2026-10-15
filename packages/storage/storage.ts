
interface BrowserStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

declare const window: { localStorage: BrowserStorage };

export interface KeyValueStorage {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

const webStorage: KeyValueStorage = {
  async getItem(key) {
    return window.localStorage.getItem(key);
  },
  async setItem(key, value) {
    window.localStorage.setItem(key, value);
  },
  async removeItem(key) {
    window.localStorage.removeItem(key);
  },
};

const nativeStorage: KeyValueStorage = {
  async getItem(key) {
    return (await import("expo-secure-store")).getItemAsync(key);
  },
  async setItem(key, value) {
    await (await import("expo-secure-store")).setItemAsync(key, value);
  },
  async removeItem(key) {
    await (await import("expo-secure-store")).deleteItemAsync(key);
  },
};

export const getKeyValueStorage = (): KeyValueStorage =>
  typeof window !== "undefined" && window.localStorage
    ? webStorage
    : nativeStorage;
