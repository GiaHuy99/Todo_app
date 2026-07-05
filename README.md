# Todo App

A full-stack todo list application built as an intern coding assessment. Manage tasks with search, status filtering, pagination, and a Linear-inspired dark UI.

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS 4, React Router, Axios, Zustand, Lucide React |
| **Backend** | Spring Boot 4.1, Java 21, Spring Data JPA, Lombok |
| **Database** | MySQL 8 |

## Features

- Create, edit, delete, and toggle todo completion
- Server-side search (debounced), filter (All / Completed / Incomplete), and pagination
- Optimistic UI for completion toggle with rollback on failure
- Toast notifications for every action
- Responsive layout (desktop, tablet, mobile)
- REST API with validation and consistent error responses

## Project Structure

```
Todo_app/
├── backend/          # Spring Boot REST API
├── frontend/         # React SPA
└── docs/
    ├── PRD.md
    ├── Technical-Design.md
    └── DESIGN.md     # Design system (single source of truth for UI)
```

## Prerequisites

- **Node.js** 20+ and npm
- **Java** 21+
- **MySQL** 8 running locally

## Getting Started

### 1. Configure the database

Update MySQL credentials in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

The app connects to `todo_app` on `localhost:3306` and creates the database automatically if it does not exist.

### 2. Start the backend

```bash
cd backend
./mvnw clean spring-boot:run
```

API runs at `http://localhost:8080`.

> Run `./mvnw clean` after moving or deleting Java source files to avoid stale compiled classes in `target/`.

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`. API requests to `/api/*` are proxied to the backend via Vite.

## API Overview

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/todos?page=0&size=10&completed=&search=` | List todos (paginated) |
| `POST` | `/api/todos` | Create todo |
| `GET` | `/api/todos/{id}` | Get todo by ID |
| `PUT` | `/api/todos/{id}` | Full update |
| `PATCH` | `/api/todos/{id}` | Partial update (e.g. `completed`) |
| `DELETE` | `/api/todos/{id}` | Delete todo |

Paginated list response:

```json
{
  "content": [...],
  "page": 0,
  "size": 10,
  "totalElements": 42,
  "totalPages": 5,
  "first": true,
  "last": false
}
```

## Scripts

### Frontend (`frontend/`)

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build and deploy to Cloudflare Workers |

### Backend (`backend/`)

| Command | Description |
|---|---|
| `./mvnw spring-boot:run` | Start Spring Boot |
| `./mvnw clean compile` | Clean build |
| `./mvnw clean package` | Build JAR |

## Deploy Frontend to Cloudflare

Cloudflare Workers CI runs from the **repo root**, not `frontend/`. The deploy must build Vite output into `frontend/dist` first — never upload the `frontend/` source folder.

### Cloudflare Workers (Git) dashboard settings

Keep deploy command as:

| Setting | Value |
|---|---|
| **Deploy command** | `npx wrangler deploy` |

Root `wrangler.jsonc` runs `npm run build:frontend` automatically via `build.command` before upload.

Optional separate build command (not required if using wrangler `build.command`):

| Setting | Value |
|---|---|
| **Build command** | `npm run build:frontend` |

Root `wrangler.jsonc` points to `./frontend/dist`. Do **not** set output directory to `frontend` (that deploys source `/src/main.tsx` and causes a black screen).

### Deploy locally

```bash
# From repo root (recommended for CI parity)
npm run deploy

# Or from frontend/ only
cd frontend && npm run deploy
```

After deploy, purge Cloudflare cache if you still see old content.

## Documentation

- [PRD](docs/PRD.md) — Product requirements and user stories
- [Technical Design](docs/Technical-Design.md) — Architecture, API spec, and conventions
- [Design System](docs/DESIGN.md) — Visual language and UI tokens

## License

Private assessment project.
