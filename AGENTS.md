---
description: Архитектурные правила React Native приложения Mecenate на базе Feature-Sliced Design (FSD)
globs: '**/*'
alwaysApply: true
---

Действуй как опытный Software Architect. Все правила ниже — обязательные и проверяются ESLint (`eslint-plugin-boundaries`) + TypeScript `strict`.

# Mecenate — архитектура

Mobile-first приложение на **Expo Router + React Native + TypeScript (strict)**. Организовано по **Feature-Sliced Design**. Вся бизнес-логика — в `src/`, корневой `app/` используется только как thin-адаптер для Expo Router.

---

## 1. Технологический стек

| Область           | Инструмент                                                                    |
| ----------------- | ----------------------------------------------------------------------------- |
| Runtime           | Expo SDK 54, React Native 0.81, React 19                                      |
| Роутинг           | `expo-router` (file-based в `app/`)                                           |
| Типизация         | TypeScript 5.9, `strict: true`                                                |
| Данные            | `@tanstack/react-query` v5 (query/mutation/infinite)                          |
| Локальный store   | MobX (`mobx`, `mobx-react-lite`) — только там, где не подходит React Query    |
| HTTP              | `axios` + кастомные обёртки `get/post/patch/put/del` в `@shared/api`          |
| Стили             | `StyleSheet.create` + токены из `@shared/constants/theme`. НИКАКОГО NativeWind |
| SVG               | `react-native-svg` + `react-native-svg-transformer` (импорт `.svg` как компонент) |
| Иконки            | `@expo/vector-icons`, SF Symbols через `expo-symbols` + собственные SVG       |
| Форматирование    | Prettier + `@trivago/prettier-plugin-sort-imports`                            |
| Линтинг           | ESLint 9 flat config + `eslint-plugin-boundaries` (правила FSD)               |

---

## 2. Слои FSD и правило импортов

```text
src/
├── shared/      # Переиспользуемый код без бизнес-логики
├── entities/    # Бизнес-сущности (data layer: api, queries, mutations, types)
├── features/    # Пользовательские сценарии (UI + бизнес-логика)
├── widgets/     # Композиционные блоки UI (используется по необходимости)
├── pages/       # Экраны приложения (тонкие композиции)
└── app/         # Инициализация, провайдеры, роутинг
```

### Направление зависимостей

Импортировать можно только из слоёв **ниже** по иерархии (+ из своего же слоя):

| Из слоя    | Можно импортировать                                     |
| ---------- | ------------------------------------------------------- |
| `app`      | `app`, `pages`, `widgets`, `features`, `entities`, `shared` |
| `pages`    | `pages`, `widgets`, `features`, `entities`, `shared`    |
| `widgets`  | `widgets`, `features`, `entities`, `shared`             |
| `features` | `features`, `entities`, `shared`                        |
| `entities` | `entities`, `shared`                                    |
| `shared`   | только внутри `shared` и внешние пакеты                 |

Правила форсятся через `eslint-plugin-boundaries` (`eslint.config.js`). Нарушение — ошибка сборки.

### Алиасы путей (`tsconfig.json`)

```text
@app/*       → src/app/*
@pages/*     → src/pages/*
@widgets/*   → src/widgets/*
@features/*  → src/features/*
@entities/*  → src/entities/*
@shared/*    → src/shared/*
```

Использовать **только алиасы** для кросс-слайсовых импортов. Относительные пути (`./`, `../`) допустимы только внутри одного слайса.

### Порядок импортов (Prettier)

Автоматически сортируется плагином. Группы через пустую строку, сверху вниз:

1. Внешние пакеты (react, react-native, expo-*, tanstack, axios…)
2. `@app/*`
3. `@pages/*`
4. `@widgets/*`
5. `@features/*`
6. `@entities/*`
7. `@shared/*`
8. Локальные (`./`, `../`)

---

## 3. Expo Router — thin adapter pattern

Файлы в корневом `app/` **не содержат логики**. Они re-export'ят компоненты из `@app/router` и `@pages/*`:

```tsx
// app/_layout.tsx
export { RootLayout as default, unstable_settings } from '@app/router';

// app/(tabs)/_layout.tsx
export { TabsLayout as default } from '@app/router';

// app/(tabs)/index.tsx
export { HomePage as default } from '@pages/home';
```

Любой новый экран добавляется в два места:
1. Создаётся страница в `src/pages/<name>/ui/<Name>Page.tsx` + `src/pages/<name>/index.ts`.
2. В `app/.../<route>.tsx` пишется один `export { default }` из `@pages/<name>`.

---

## 4. Слой `app`

```text
src/app/
├── index.ts
├── providers/
│   ├── QueryProvider.tsx     # TanStack QueryClientProvider
│   └── index.ts
└── router/
    ├── RootLayout.tsx        # Stack + шрифты + splash + тема + провайдеры
    ├── TabsLayout.tsx        # Bottom tabs
    └── index.ts
```

`RootLayout` — единственное место, где монтируются глобальные провайдеры (`QueryProvider`, `ThemeProvider`), подгружаются шрифты и инициализируется API-токен через `setApiAuthTokenGetter` из `@shared/api`.

---

## 5. Слой `shared`

```text
src/shared/
├── api/              # axios клиент, interceptors, queryClient
│   ├── axios.ts
│   ├── interceptors.ts
│   ├── query-client.ts
│   ├── types.ts
│   ├── utils.ts
│   └── index.ts
├── assets/           # иконки и картинки
│   ├── icons/        # *.svg
│   ├── images/       # *.png
│   ├── icons.ts      # sharedIcons реестр
│   ├── images.ts     # sharedImages реестр
│   └── index.ts
├── constants/        # FigmaColorPalette, UiKitColors, Typography, Spacing, BorderRadius, ControlSizes
├── helpers/          # чистые утилиты (dateHelper, numberHelper, textHelper)
├── hooks/            # use-color-scheme (+ .web), use-theme-color
├── lib/              # конфиги внешних библиотек (utils.ts)
├── types/            # глобальные типы и декларации (svg.d.ts)
├── ui/               # UI-кит (UIButton, UITextInput, UISkeleton, UIStateCard, RenderSharedIcon…)
├── appConfig.ts      # baseUrl, timeouts и т.п.
└── index.ts
```

### Правила `shared`

- **Нет бизнес-логики.** Только универсальные примитивы.
- **Стили — через токены.** Цвета только из `UiKitColors[theme]` или `FigmaColorPalette`. Spacing/radius/typography — из соответствующих модулей. Хардкод чисел/хексов запрещён.
- **SVG-иконки** регистрируются в `sharedIcons` и рендерятся через `RenderSharedIcon`, а не импортируются напрямую в компонентах UI-фичи.
- **Прямые импорты UI-компонентов**: `import { UIButton } from '@shared/ui/UIButton'` (а не через barrel `@shared/ui`). Barrel оставлен для совместимости, но новый код пишет прямые пути.

---

## 6. Слой `entities` — только данные

Каждая сущность — бизнес-объект. Содержит всё, что нужно для работы с ним **на уровне данных**. **UI-компонентов в `entities/` нет** (см. п. 7).

```text
src/entities/
└── post/
    ├── api.ts              # функции HTTP (getPosts, getPostById, togglePostLike)
    ├── queries.ts          # useGetPostsFeedInfiniteQuery, useGetPostByIdQuery, …
    ├── mutations.ts        # useTogglePostLikeMutation
    ├── store.ts            # MobX store (по необходимости)
    ├── types.ts            # доменные модели (PostModel, AuthorModel, PostTier)
    ├── dto.ts              # типы API-контракта (GetPostsDto, TogglePostLikeDto)
    ├── forms.ts            # типы форм
    ├── consts.ts           # postQueryKeys, postApiKeys
    ├── mapper/             # нормализация response → domain model
    │   ├── types.ts        # raw-типы ответа
    │   ├── mapAuthor.ts
    │   ├── mapPost.ts
    │   ├── mapPostsFeed.ts
    │   └── index.ts
    └── index.ts            # Public API
```

### Паттерн `api.ts`

```ts
import { get, post } from '@shared/api/axios';

import { postApiKeys } from './consts';
import { GetPostsDto } from './dto';
import { mapPostsFeed } from './mapper';
import { PostsFeedResponse } from './mapper/types';

export const getPosts = (params: GetPostsDto = {}) =>
  get<PostsFeedResponse>(postApiKeys.getPosts, { params })
    .then(response => mapPostsFeed(response.data));
```

### Паттерн `queries.ts`

```ts
export const useGetPostsFeedInfiniteQuery = (params: GetPostsDto = {}) => {
  const normalized = normalizePostsQuery(params);

  return useInfiniteQuery({
    queryKey: [postQueryKeys.postsFeed, 'infinite', normalized],
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) => getPosts({ ...normalized, cursor: pageParam }),
    getNextPageParam: lastPage => (lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined),
  });
};
```

### Паттерн `mutations.ts`

Инвалидация относящихся query keys **обязательна**:

```ts
export const useTogglePostLikeMutation = () =>
  useMutation({
    mutationKey: [postQueryKeys.togglePostLike],
    mutationFn: togglePostLike,
    onSuccess: (_, form) => {
      queryClient.invalidateQueries({ queryKey: [postQueryKeys.postsFeed] });
      queryClient.invalidateQueries({ queryKey: [postQueryKeys.postById, form.postId] });
    },
  });
```

### Маппер → domain model

Все внешние ответы нормализуются в модели из `types.ts`. Поля, которые могут отсутствовать в API, типизируются как `T | null`. Компоненты UI обязаны это учитывать (filter + fallback).

### Нормализация query params

Перед отправкой в `queryKey`/`queryFn` параметры прогоняются через `normalizeXQuery` — это стабилизирует ключ кеша.

---

## 7. Слой `features` — UI + бизнес-логика сценария

**~80% кода проекта живёт здесь.** Фича — законченный пользовательский сценарий с собственным UI и моделью.

```text
src/features/
└── postFeed/
    ├── index.ts                     # Public API
    ├── config/                      # (опционально) константы фичи
    ├── model/
    │   ├── hooks/                   # кастомные хуки фичи
    │   │   ├── useGetPostsFeed.ts
    │   │   ├── useTogglePostLike.ts
    │   │   ├── useOpenPostComments.ts
    │   │   ├── useSendPostDonate.ts
    │   │   └── usePostExpandable.ts
    │   ├── schemas/                 # (опционально) Zod-валидация
    │   └── helpers/                 # (опционально) чистые хелперы фичи
    └── ui/
        ├── PostsFeed.tsx            # точка входа фичи
        ├── CommentItem.tsx          # одиночный файл — НЕ кладём в папку
        ├── PostCard/                # группа (>1 файла)
        │   ├── PostCard.tsx
        │   ├── PostCardSkeleton.tsx
        │   ├── PostExpandableBody.tsx
        │   └── PostPaidOverlay.tsx
        └── PostActions/             # группа (>1 файла)
            ├── PostActionButton.tsx
            ├── PostLikeButton.tsx
            └── PostCommentButton.tsx
```

### Правила слайса `features`

1. **Вся работа с данными — через хуки из `features/<name>/model/hooks/`.** Компонент UI не вызывает `useQuery`/`useMutation` из `@entities/*` напрямую — он зовёт `useGetPostsFeed`, `useTogglePostLike` и т.п. Эти хуки:
   - оборачивают entity-запросы,
   - добавляют derived state (`isInitialLoading`, `isEmpty`, `isInitialError`),
   - предоставляют действия (`refresh`, `retry`, `fetchNextPage`).
2. **UI — это `ui/*.tsx`.** Никаких компонентов в entities.
3. **Группировка UI по смыслу.** Связанные компоненты объединяются в подпапку. Одиночные файлы лежат плоско.
4. **Внутри UI-группы нет `index.ts`.** Импорт всегда конкретный: `./PostCard/PostCard`, `./PostActions/PostLikeButton`.
5. **Public API (`index.ts`)** экспортирует только то, что реально потребляется извне. Внутренние хуки и компоненты — приватные.

### Пример хука модели

```ts
// features/postFeed/model/hooks/useGetPostsFeed.ts
export const useGetPostsFeed = ({ limit = 10 } = {}) => {
  const feedQuery = useGetPostsFeedInfiniteQuery({ limit });

  const posts = useMemo(
    () =>
      feedQuery.data?.pages
        .flatMap(page => page.posts ?? [])
        .filter((post): post is PostModel => post !== null) ?? [],
    [feedQuery.data],
  );

  return {
    posts,
    isInitialLoading: feedQuery.isPending && !feedQuery.data,
    isInitialError: feedQuery.isError && posts.length === 0,
    isEmpty: posts.length === 0,
    refresh: feedQuery.refetch,
    retry: feedQuery.refetch,
    fetchNextPage: feedQuery.fetchNextPage,
    isFetchingNextPage: feedQuery.isFetchingNextPage,
  };
};
```

### Пример Public API фичи

```ts
// features/postFeed/index.ts
export { PostsFeed } from './ui/PostsFeed';
```

Хуки `useGetPostsFeed`, `useTogglePostLike` и т.п. **не экспортируются** — они используются только внутри фичи через `../model/hooks/...`.

---

## 8. Слой `widgets`

Widgets — композиционные блоки, склеивающие несколько фичей/entity под общую задачу (header, sticky-панель, лэндинг-секция). Сейчас слой пуст (`export {};`). Заводить widget **только если** компонент объединяет >1 фичи. Если компонент обслуживает одну фичу — он живёт в `features/*/ui/`.

---

## 9. Слой `pages`

Страница — минимальный shell. Её задачи:
- получить route-параметры,
- задать отступы/safe area,
- смонтировать фичи/виджеты.

**Никакой бизнес-логики, никаких `useQuery`**, никаких стилей за пределами layout.

```tsx
// src/pages/home/ui/HomePage.tsx
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PostsFeed } from '@features/postFeed';

export function HomePage() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <PostsFeed />
    </View>
  );
}
```

---

## 10. Правила Public API (barrel `index.ts`)

- **Экспортировать только то, что реально используется извне слайса.** Неиспользуемые экспорты — мёртвый код, их удаляем.
- **Public API = контракт.** Внутренние файлы могут меняться, внешний интерфейс стабилен.
- **Не переэкспортировать всё подряд через `export *`** для слайсов с чёткой моделью (entities, features). Явные named exports.
- **Если слайс пуст** (заготовка) — `export {};`.
- **Типы — через `export type`**, значения — через `export`. Не смешивать.

Проверочный вопрос перед добавлением экспорта: «Кто-то снаружи этого слайса реально это импортирует?». Нет — удаляем.

---

## 11. UI / стилизация

- Цвета, typography, spacing, radii, sizes — только из `@shared/constants/theme`.
- Темы: `const colors = UiKitColors[useColorScheme() ?? 'light']`.
- Для visual-вариантов (like/comment × default/pressed/disabled и т.п.) использовать **lookup-таблицы** (`Record<Variant, Record<State, Visual>>`), а не вложенные тернарники. Пример — `PostActionButton.tsx`.
- SVG-иконки: импорт через `sharedIcons.*` + `RenderSharedIcon`.

---

## 12. Именование

- Файлы компонентов: `PascalCase.tsx` (`PostCard.tsx`).
- Хуки: `useCamelCase.ts` (`useGetPostsFeed.ts`).
- Papers/utils: `camelCase.ts` (`mapPostsFeed.ts`, `dateHelper.ts`).
- Типы моделей с суффиксом `Model` (`PostModel`, `CommentModel`).
- DTO с суффиксом `Dto` (`GetPostsDto`).
- Query keys — объект `xxxQueryKeys` в `consts.ts`.
- API keys — объект `xxxApiKeys` в `consts.ts`.

---

## 13. API-контракт

Источник истины — OpenAPI:

- https://k8s.mectest.ru/test-app/openapi.json

Флоу изменений:
1. Актуализировать `entities/<x>/dto.ts` + `mapper/types.ts` под OpenAPI.
2. При необходимости обновить `api.ts`, `queries.ts`, `mutations.ts`, `mapper/*`.
3. Подняться в `features/*/model/hooks/*`, добавить/обновить derived state.
4. Обновить UI в `features/*/ui/*`.

---

## 14. Команды

```bash
npm run start        # Expo dev server
npm run ios          # iOS simulator
npm run android      # Android emulator
npm run web          # Web preview
npm run lint         # ESLint (включая boundaries)
npx tsc --noEmit     # TypeScript проверка
```

---

## 15. Принципы чистого кода

- **Single Responsibility** — один файл, одна ответственность.
- **Инкапсуляция** — прятать реализацию за Public API.
- **Явность > магия** — lookup-таблицы вместо вложенных условий; именованные экспорты вместо `export *` там, где важно.
- **Consistency** — если в проекте есть pattern (например, hooks в `model/hooks/`), новый код ему следует.
- **Минимальные зависимости между слайсами** — если фиче А нужны потроха фичи Б, это повод вынести общее в `shared`/`entities` или завести widget.
- **Нет комментариев-хроник** — не оставлять `// изменил логику`. Код — документация.
