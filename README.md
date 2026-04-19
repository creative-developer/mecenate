# Mecenate (Expo + Feature-Sliced Design)

React Native приложение на Expo Router, организованное по FSD:

```text
src/
├── shared/
├── entities/
├── features/
├── widgets/
├── pages/
└── app/
```

## Запуск

```bash
npm install
npm run start
```

## Переменные окружения

- `EXPO_PUBLIC_APP_API_URL` — optional, базовый URL API (по умолчанию `https://k8s.mectest.ru/test-app`)
- `EXPO_PUBLIC_APP_API_TOKEN` — optional, Bearer token. Если не задан, используется тестовый UUID-токен из OpenAPI.

## Архитектурные алиасы

- `@app/*` -> `src/app/*`
- `@pages/*` -> `src/pages/*`
- `@widgets/*` -> `src/widgets/*`
- `@features/*` -> `src/features/*`
- `@entities/*` -> `src/entities/*`
- `@shared/*` -> `src/shared/*`

## Роутинг

Expo Router оставлен в корневом `app/*`, но эти файлы работают как thin adapters и делегируют логику в `src/app` и `src/pages`.

## Проверки

```bash
npm run lint
npx tsc --noEmit
```
