# Ledger — self-hosted AI accounting

Upload receipts and invoices, extract data with AI, organize transactions by category and project, and export for your accountant.

## Deploy with Docker

```bash
docker compose up --build -d
```

Open [http://localhost:7331](http://localhost:7331).

Set a strong `BETTER_AUTH_SECRET` in `docker-compose.yml` before production. Data: `./data` (uploads), `./pgdata` (PostgreSQL).

## Environment

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `UPLOAD_PATH` | Yes | Upload directory |
| `DATABASE_URL` | Yes | PostgreSQL URL |
| `BETTER_AUTH_SECRET` | Yes | Auth secret (32+ characters recommended) |
| `SELF_HOSTED_MODE` | No | `true` for self-hosted |

See `.env.example` for LLM keys and other options.

## Local development

```bash
npm install
cp .env.example .env
npx prisma generate && npx prisma migrate dev
npm run dev
```

