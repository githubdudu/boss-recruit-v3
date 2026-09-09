# BossRecruit

Monorepo for BossRecruit: a React frontend, an Express/MongoDB backend, and a Docker Compose dev stack.

| Path | What |
|---|---|
| `frontend/` | Vite + React 19 + TypeScript + TailwindCSS, tested with Vitest & Testing Library |
| `backend/` | Express 5 + Mongoose, tested with Vitest & Supertest |
| `compose.yaml` | Dev stack: frontend, backend, MongoDB |

## Getting started

Whole stack (frontend on <http://localhost>):

```bash
docker compose up --build
```


Or per package:

```bash
cd frontend && npm install && npm run dev   # http://localhost:5173
cd backend  && npm install && npm run dev
```
## Development

After changing dependencies (`package.json` / `package-lock.json`), add `-V`:

```bash
docker compose up --build -V
```

`node_modules` lives in an anonymous volume 

`-V` (`--renew-anon-volumes`) discards that volume and re-initialises it from the new image.

## Scripts

Frontend: `npm run dev | build | serve | test | test:ui | lint | typecheck`
Backend: `npm run start | dev | test | test:coverage | format | init_db`

## Git hooks

Hooks live in `.husky/` at the repo root and run lint-staged plus the test suite for both packages.
They are wired up by `npm install` in `frontend/`, whose `prepare` script runs husky against the repo root.

## License

MIT — see [LICENSE](LICENSE).
