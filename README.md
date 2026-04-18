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
