const readEnv = (key: string): string | undefined => {
  const value = process.env[key];
  return typeof value === 'string' && value.length > 0 ? value : undefined;
};

const readEnvNumber = (key: string, fallback: number): number => {
  const raw = readEnv(key);
  if (!raw) {
    return fallback;
  }

  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const DEFAULT_API_BASE_URL = 'https://k8s.mectest.ru/test-app';
const DEFAULT_API_TIMEOUT_MS = 15000;

export const appConfig = {
  appName: 'Mecenate',
  api: {
    baseUrl: readEnv('EXPO_PUBLIC_APP_API_URL') ?? DEFAULT_API_BASE_URL,
    requestTimeoutMs: readEnvNumber('EXPO_PUBLIC_APP_API_TIMEOUT_MS', DEFAULT_API_TIMEOUT_MS),
    authToken: readEnv('EXPO_PUBLIC_APP_API_TOKEN') ?? null,
  },
} as const;
