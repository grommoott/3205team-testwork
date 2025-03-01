# Сокращатель ссылок — Cck

В данном репозитории представлена тестовая работа для компании 3205.team. Backend написан на Nest.js + Typeorm, в качестве бд используется PostgreSQL. Frontend — на React + некоторые компоненты из AntD. Backend запускается на порту 3000, Frontend — на порту 4173, изменения этих значений не предусмотрено, но если нужно, то можете их изменить в `docker-compose.yaml`

## Инструкция по запуску

Для запуска вам понадобится Docker Compose и возможность создать и отредактировать переменные окружения.

1) Переименуйте файл `.env.example` в `.env` и заполните значения из этого файла своими данными(хотя можно оставить по умолчанию)
1.1) Если планируется доступ не только с локальной машины, то измените в файлах `.env` и `frontend/.env` значения переменных `BACKEND_BASE_URL` и `VITE_BACKEND_BASE_URL` соответственно на адрес, по которому планируется доступ к backend'у(например, если хотите запустить приложение на сервере с публичным адресом `a.b.c.d`, то установите эти переменные в `http://a.b.c.d:3000`), также если вы меняли порт, на котором запускается backend, то вместо `3000` укажите его
2) Пропишите команду `docker compose up --build`
3) Готово! Вы запустили Cck

## Документация по API

#### `POST /shorten`
Создаёт новый укороченный url

Тело запроса
```typescript
{
    originalUrl: string // сокращаемый url
    expiresAt?: Date // время, после которого ссыка будет удалена
    alias?: string // кастомный алиас
}
```
Тело ответа
```typescript
{
    url: string // укороченный url в формате `http://${BACKEND_BASE_URL}/${shortUrl}`
}
```

Ошибки:
 - `400: Url with such shortUrl is already exists`

#### `GET /:shortUrl`
Переадресовывает на url, который был сокращён, и получил `shortUrl` равным `:shortUrl`

Ошибки:
 - `404`: Если не существует укороченной ссылки с `shortUrl` равным `:shortUrl`

#### `GET /info/:shortUrl`
Возвращает базовую информацию о ссылке

Тело ответа
```typescript
{
    originalUrl: string // сокращённый url
    createdAt: Date // дата сокращения url
    clickCount: number // количество переходов по сокращённой ссылке
}
```

Ошибки:
 - `404`: Если не существует укороченной ссылки с `shortUrl` равным `:shortUrl` 

#### `DELETE /delete/:shortUrl`
Удаляет сокращённую ссылку с `shortUrl` равным `:shortUrl`

Ошибки:
 - `404`: Если не существует укороченной ссылки с `shortUrl` равным `:shortUrl`

#### `GET /analytics/:shortUrl`
Возвращает подробную информацию о ссылке

Тело ответа
```typescript
{
    clickCount: number // количество переходов по сокращённой ссылке
    lastIps: string[] // ip, с которых были совершены 5 последних переходов
}
```
