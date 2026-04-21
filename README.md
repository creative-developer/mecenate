# Mecenate

Mobile-first приложение на **Expo SDK 54 + React Native 0.81 + TypeScript (strict)**, организованное по методологии
**Feature-Sliced Design (FSD)**. Роутинг — `expo-router`, данные — `@tanstack/react-query`, локальный стор — MobX, HTTP
— axios.

```text
src/
├── app/        # Инициализация, провайдеры, роутинг
├── pages/      # Экраны (тонкие композиции)
├── widgets/    # Композиционные блоки UI
├── features/   # Пользовательские сценарии (UI + бизнес-логика)
├── entities/   # Бизнес-сущности (api, queries, mutations, типы)
└── shared/     # Переиспользуемый код без бизнес-логики
```

Подробные архитектурные правила — в [AGENTS.md](./AGENTS.md).

---

## Требования

| Инструмент  | Версия                                            |
| ----------- | ------------------------------------------------- |
| Node.js     | `>=20.19.4` (см. `engines.node` в `package.json`) |
| npm         | `>=10.8.0`                                        |
| Expo Go     | актуальная версия на телефоне (iOS / Android)     |
| Xcode       | для iOS simulator (macOS)                         |
| Android SDK | для Android emulator                              |

Проверить версии:

```bash
node -v
npm -v
```

---

## Быстрый старт

```bash
git clone <repo-url>
cd mecenate

npm install
cp .env.example .env

npm run start
```

После старта Expo CLI откроет Dev Tools и покажет QR-код:

- **iOS**: сканируй QR камерой → откроется в Expo Go. Либо нажми `i` в терминале, чтобы запустить iOS simulator.
- **Android**: сканируй QR внутри приложения Expo Go. Либо нажми `a` — запустится Android emulator.
- **Web**: нажми `w` в терминале или открой `http://localhost:8081`.

Доступные npm-скрипты:

```bash
npm run start        # Expo dev server (Metro) с выбором платформы
npm run ios          # сразу в iOS simulator
npm run android      # сразу в Android emulator
npm run web          # веб-превью
npm run lint         # ESLint + eslint-plugin-boundaries (FSD-правила)
npx tsc --noEmit     # проверка типов TypeScript
```

---

## Переменные окружения

Проект использует нативный механизм Expo для подхвата переменных окружения из `.env` в корне репозитория. Все
переменные, доступные в клиентском бандле, **обязаны** начинаться с префикса `EXPO_PUBLIC_` — иначе Expo их не
экспортирует в `process.env` на клиенте.

### Как подключить

1. Скопируй шаблон:

   ```bash
   cp .env.example .env
   ```

2. Отредактируй `.env` под своё окружение.
3. **Перезапусти Metro** после изменения `.env` (`npm run start -- --clear`), иначе старые значения останутся в кеше
   бандлера.

Файл `.env` включён в `.gitignore` и никогда не попадает в репозиторий. Шаблон `.env.example` коммитится и служит
источником истины по списку переменных.

### Список переменных

| Переменная                       | Обязательная | По умолчанию                      | Назначение                                                                       |
| -------------------------------- | ------------ | --------------------------------- | -------------------------------------------------------------------------------- |
| `EXPO_PUBLIC_APP_API_URL`        | нет          | `https://k8s.mectest.ru/test-app` | Базовый URL backend API. Используется в `axios.create({ baseURL })`.             |
| `EXPO_PUBLIC_APP_API_TIMEOUT_MS` | нет          | `15000`                           | Таймаут HTTP-запросов в миллисекундах.                                           |
| `EXPO_PUBLIC_APP_API_TOKEN`      | да (для API) | —                                 | Bearer-токен авторизации. Без него запросы уходят без заголовка `Authorization`. |

В шаблоне `.env.example` указан тестовый UUID-токен `550e8400-e29b-41d4-a716-446655440000` из OpenAPI — его достаточно,
чтобы сразу получить ответы от тестового стенда.

### Где они используются в коде

- [`src/shared/appConfig.ts`](./src/shared/appConfig.ts) — единственное место, где читаются `process.env.*`. Здесь же
  лежат безопасные дефолты для публичного URL и таймаута.
- [`src/shared/api/axios.ts`](./src/shared/api/axios.ts) — создаёт axios-клиент на основе `appConfig.api.baseUrl` и
  `appConfig.api.requestTimeoutMs`.
- [`src/app/router/RootLayout.tsx`](./src/app/router/RootLayout.tsx) — передаёт `appConfig.api.authToken` в
  `setApiAuthTokenGetter`, чтобы axios-интерцептор подставлял `Authorization: Bearer <token>` к каждому запросу.

Никакие секреты и URL backend'а **больше не захардкожены в исходниках** — всё конфигурируется через `.env`.

---

## Архитектурные алиасы (`tsconfig.json`)

```text
@app/*       → src/app/*
@pages/*     → src/pages/*
@widgets/*   → src/widgets/*
@features/*  → src/features/*
@entities/*  → src/entities/*
@shared/*    → src/shared/*
```

Для кросс-слайсовых импортов использовать **только алиасы**. Относительные пути допустимы внутри одного слайса.

---

## Типовые проблемы

- **Приложение не видит переменные из `.env`.** Убедись, что имена начинаются с `EXPO_PUBLIC_`, и перезапусти Metro с
  флагом `--clear`:

  ```bash
  npm run start -- --clear
  ```

- **401 / 403 от API.** Проверь, что в `.env` задан `EXPO_PUBLIC_APP_API_TOKEN`. Без токена интерцептор не добавляет
  `Authorization`.

- **Другой backend (staging/prod).** Поменяй `EXPO_PUBLIC_APP_API_URL` в `.env` и перезапусти Metro.

- **Expo Go не видит dev-сервер.** Убедись, что телефон и компьютер в одной Wi-Fi сети, либо запусти туннель:
  `npm run start -- --tunnel`.

---

## OpenAPI

Источник истины API-контракта: <https://k8s.mectest.ru/test-app/openapi.json>
