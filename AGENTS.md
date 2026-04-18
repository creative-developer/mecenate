---
description: Архитектурные правила фронтенд-приложения на основе Feature-Sliced Design (FSD)
globs: '**/*'
alwaysApply: true
---

Действуй как опытный Software Architecture.

# Архитектура фронтенд-приложений

## Feature-Sliced Design (FSD)

Мы используем методологию **Feature-Sliced Design (FSD)** для организации структуры проекта и управления потоком
зависимостей.

### Структура слоев (от нижнего к верхнему)

```text
src/
├── shared/          # Переиспользуемый код без бизнес-логики
├── entities/        # Бизнес-сущности (Order, User, Hotel)
├── features/        # Пользовательские сценарии (Checkout, Auth)
├── widgets/         # Композиционные блоки UI (Header, Sidebar)
├── pages/           # Страницы приложения
└── app/             # Инициализация, провайдеры, роутинг
```

### Правило импорта

Код может импортировать только из слоев, расположенных **ниже** в иерархии:

- `app` → может импортировать из всех слоев
- `pages` → widgets, features, entities, shared
- `widgets` → features, entities, shared
- `features` → entities, shared
- `entities` → shared
- `shared` → только внешние библиотеки

---

## Структура слоя `shared`

```text
shared/
├── api/                    # HTTP клиент, interceptors
│   ├── axios.ts            # Настроенный axios client
│   ├── interceptors.ts     # Request/response interceptors
│   ├── query-client.ts     # TanStack Query client
│   └── types.ts            # API типы ошибок
├── assets/                 # Статические ресурсы
│   ├── icons/
│   └── images/
├── constants/              # Глобальные константы
├── helpers/                # Утилитарные функции
│   ├── dateHelper.ts
│   ├── numberHelper.ts
│   └── textHelper.ts
├── hooks/                  # Переиспользуемые хуки
│   ├── useMediaQuery.ts
│   └── useExpireAt.ts
├── lib/                    # Конфигурации библиотек
│   └── utils.ts            # cn() и другие утилиты
├── mappers/                # Общие маперы данных
├── types/                  # Глобальные типы
│   └── types.ts
├── ui/                     # UI-кит компонентов
│   ├── Buttons/
│   ├── UITextField/
│   ├── UIDialog.tsx
│   └── ...
└── appConfig.ts            # Конфигурация приложения
```

---

## Структура слоя `entities`

Каждая сущность (`entity`) представляет бизнес-объект с полным набором файлов для работы с данными:

```text
entities/
└── order/                   # Пример сущности Order
    ├── api.ts               # API функции (getOrderById, setMembers)
    ├── queries.ts           # React Query хуки (useGetOrderByIdQuery)
    ├── mutations.ts         # React Query мутации (useSetMembersMutation)
    ├── store.ts             # Mobx stores (useCheckoutStore)
    ├── types.ts             # TypeScript типы и enums
    ├── dto.ts               # DTO типы для API запросов
    ├── forms.ts             # Типы форм и enum полей
    ├── consts.ts            # Query keys, API keys, константы
    ├── analytics.ts         # Analytics события
    ├── index.ts             # Public API (экспорты)
    └── mapper/              # Функции маппинга
        ├── mapOrderModel.ts
        ├── mapOrderSummaryModel.ts
        └── prepareSetMembersDto.ts
```

### Public API (`index.ts`)

Экспортируйте только то, что нужно другим слоям:

```ts
// entities/order/index.ts
export { useGetOrderByIdQuery, useGetOrderListQuery } from './queries';

export { useSetMembersMutation, useFinishOrderMutation } from './mutations';

export type { OrderModel, OrderSummaryModel } from './types';
export { OrderStatus, PaymentStatus } from './types';

export { useCheckoutStore } from './store';
export { orderQueryKeys } from './consts';
```

---

## Структура слоя `features`

Features содержат пользовательские сценарии и бизнес-логику:

```text
features/
└── checkout/                # Пример фичи Checkout
    ├── index.ts             # Public API
    ├── config/              # Конфигурация фичи
    │   └── index.ts
    ├── model/               # Бизнес-логика
    │   ├── hooks/           # Хуки фичи
    │   │   ├── useGetOrderById.ts
    │   │   ├── useSubmitPayment.ts
    │   │   └── skipass/
    │   │       ├── index.ts
    │   │       └── useGetSkiPassesList.ts
    │   ├── schemas/         # Zod схемы валидации
    │   │   ├── contactDetailsFormSchema.ts
    │   │   └── passengerDetailsFormSchema.ts
    │   ├── helpers/         # Хелперы фичи
    │   │   └── index.ts
    │   └── types.ts         # Типы фичи
    └── ui/                  # UI компоненты фичи
        ├── Checkout/
        │   ├── Checkout.tsx
        │   └── CheckoutSidebar.tsx
        ├── PassengerDetails/
        │   └── PassengerDetailsFlow.tsx
        └── ReviewAndPay/
            └── ReviewAndPayFlow.tsx
```

---

## Структура слоя `widgets`

Widgets — композиционные блоки, объединяющие features и entities:

```text
widgets/
└── header/
    ├── index.ts
    └── ui/
        ├── DesktopMenu.tsx
        ├── MobileMenu.tsx
        └── Desktop/
            ├── CurrencyList.tsx
            └── LanguageList.tsx
```

---

## Структура слоя `pages`

Pages — минимальная логика, композиция виджетов и features:

```text
pages/
└── checkout/
    ├── index.ts
    └── ui/
        ├── CheckoutPage.tsx
        ├── PassengerDetailsPage.tsx
        ├── AddonsPage.tsx
        └── ReviewAndPayPage.tsx
```

### Паттерн страницы

```tsx
// pages/checkout/ui/PassengerDetailsPage.tsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { OrderExpiredModal } from '@widgets/order';

import { CheckoutFlowTopPanel, PassengerDetailsFlow } from '@features/checkout';

import { useCheckoutAnalytics } from '@entities/order';

import { UIContainer } from '@shared/ui/UIContainer';

export const PassengerDetailsPage = () => {
  const params = useParams<{ orderId: string }>();
  const { trackGuestsPageViewed } = useCheckoutAnalytics();

  useEffect(() => {
    if (params.orderId) {
      trackGuestsPageViewed({ orderId: params.orderId });
    }
  }, [params.orderId]);

  return (
    <section className="flex flex-1 pt-12 pb-40">
      <UIContainer>
        <CheckoutFlowTopPanel />
        <PassengerDetailsFlow />
      </UIContainer>
      <OrderExpiredModal />
    </section>
  );
};
```

---

## Структура слоя `app`

```text
app/
├── App.tsx                  # Корневой компонент
├── main.tsx                 # Entry point
├── global.css               # Глобальные стили
├── Router/                  # Роутинг
│   ├── Router.tsx
│   ├── config/
│   │   └── relativeRoutes.ts
│   └── utils/
│       └── createLanguageRoutes.tsx
├── providers/               # Context providers
│   └── AmplitudeProvider.tsx
├── layouts/                 # Layouts
│   └── ui/
│       └── AdaptiveLayout.tsx
└── components/              # App-level компоненты
    └── LanguageDetector.tsx
```

---

## Принципы чистого кода и архитектуры

- **Консистентность:** единообразие в именовании, структуре файлов, стиле кода.
- **Инкапсуляция:** скрывайте детали реализации за Public API (`index.ts`).
- **Single Responsibility:** один модуль — одна ответственность.
- **Разделение ответственности:** UI, бизнес-логика, работа с данными — в разных файлах.
- **Слабая связанность:** минимизируйте зависимости между модулями.

---

## API-контракт

Источник OpenAPI-спецификации:

- [OpenAPI JSON](https://k8s.mectest.ru/test-app/openapi.json)

Правило работы с API:

- Любые типы DTO, API-функции и query keys должны строиться на основе текущей OpenAPI-спецификации.
- Изменения API сначала синхронизируются в `entities/*/dto.ts` и `entities/*/api.ts`, затем поднимаются в
  features/widgets/pages.
