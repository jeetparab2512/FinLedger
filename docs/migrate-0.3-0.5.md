# How to migrate data from v0.3 to v0.5

In v0.5 the database moved from SQLite to Postgres. There is no automatic in-place migration between engines—you export from the old stack and restore into the new one.

If you already upgraded without exporting first, check backups on the old volume or host; data may still be recoverable from prior dumps.

## Step 1: Run the last SQLite-based app (v0.3.0)

Pin your app image to the last release that used SQLite (example tag `v0.3.0`). Adjust the image name to match **your** registry or local build:

```yaml
services:
  app:
    image: ghcr.io/<your-org>/ledger:v0.3.0
    ports:
      - "7331:7331"

# everything else stays the same
```

## Step 2: Restart and download a backup

```bash
docker compose down
docker compose up -d
```

In the app: **Settings → Backups → Download Data Archive** and save the `.zip` on your machine.

## Step 3: Upgrade to the Postgres-based stack

Update `docker-compose` to your current image (e.g. `latest` or a tagged Postgres release) and bring the stack up again.

```yaml
services:
  app:
    image: ghcr.io/<your-org>/ledger:latest
    ports:
      - "7331:7331"

# everything else stays the same
```

Restart:

```bash
docker compose down
docker compose up -d
```

## Step 4: Restore from the archive

**Settings → Backups → Restore from a backup** — upload the zip and confirm import stats.

If restore fails on request size, increase the server actions body limit in [`next.config.ts`](../next.config.ts) (e.g. `bodySizeLimit` under `experimental.serverActions`).
