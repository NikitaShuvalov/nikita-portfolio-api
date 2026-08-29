# nikita-portfolio-api — Backend

Цифровая визитка (backend) на **NestJS + TypeScript + Prisma + GraphQL + Docker**.

## Стек

- Git
- TypeScript
- Node.js
- NestJS
- Prisma (SQLite)
- GraphQL (Apollo Server + code-first)
- Docker

## Быстрый старт (локально)

```bash
# 1. Установка зависимостей
npm install

# 2. Генерация Prisma Client и создание БД
npx prisma generate
npx prisma db push
npx prisma db seed

# 3. Запуск
npm run start:dev
```

Откройте http://localhost:3000/graphql — Apollo Sandbox.

### Пример запроса

```graphql
query {
  profile {
    name
    description
    github
    skills {
      name
      level
    }
    experience {
      company
      position
      startDate
      endDate
      achievements
    }
    projects {
      name
      description
      url
    }
  }
}
```

## Docker

```bash
docker compose up --build
```

Приложение будет доступно на http://localhost:3000/graphql.

## Архитектурные решения

- **Разделение ответственности**: Resolver → Service → Prisma.
- **Code-first GraphQL**: модели описываются декораторами, схема генерируется автоматически.
- **Вложенные данные**: `profile` возвращает связанные skills / experience / projects одним запросом (Prisma `include`).
- **Инициализация БД**: при первом запуске (нет файла БД или нет записей) выполняется seed.
- **SQLite**: упрощает локальный запуск и Docker (не нужен отдельный контейнер БД). При желании легко переключить на PostgreSQL.

## Переменные окружения

```
DATABASE_URL="file:./dev.db"
PORT=3000
```
