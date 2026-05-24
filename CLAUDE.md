# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Commands

```bash
bun start          # ng serve on http://localhost:4200
bun run build      # production build
bun test           # karma unit tests (all)
ng test --include='**/auth.service.spec.ts'  # run a single spec file
```

Prettier is configured (100 chars, single quotes, `angular` parser for HTML). Run via your editor on save or `bunx prettier --write .`.

## Architecture

See the parent `gameflix/CLAUDE.md` for the full frontend file tree. Key points that require reading multiple files to understand:

### Standalone component bootstrap

There are no NgModules. `src/main.ts` calls `bootstrapApplication(AppComponent, appConfig)`. All providers (router, HttpClient, interceptors) are registered once in `app.config.ts`. Components declare their own imports inline.

### Auth flow (three-file contract)

`AuthService` (`core/services/auth.service.ts`) owns token storage and HTTP calls. `authInterceptor` (`core/interceptors/auth.interceptor.ts`) reads the token **directly from `localStorage`** using the same `AUTH_TOKEN_STORAGE_KEY` constant — it deliberately bypasses `AuthService` to avoid a circular dependency (`HttpClient → AuthService → HttpClient`). `authGuard` (`core/guards/auth.guard.ts`) delegates to `AuthService.isLoggedIn()`, which is a simple `localStorage` presence check (not a server round-trip).

`HomeComponent.ngOnInit` calls `GET /auth/me` via `AuthService.getMe()` — this is the only live token validation; the guard only checks local state.

### Adding a new protected page

1. Create `src/app/pages/<name>/<name>.component.ts` as a standalone component.
2. Add the route to `app.routes.ts` with `canActivate: [authGuard]`.
3. No provider registration needed — `AuthService` is `providedIn: 'root'`.

### API base URL

`src/environments/environment.ts` exports `environment.apiUrl` (`http://localhost:3000/api`). All service HTTP calls build on this. There is no environment switching file for production yet — update this file when deploying.
