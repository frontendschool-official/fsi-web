# Frontend School Web Monorepo

This repository contains the frontend for the **Frontend School** platform. It is built as a monorepo using **Turborepo** and **pnpm** and houses two separate Next.js applications – an **admin** portal and a **consumer** (student–facing) app – as well as shared packages for configuration, UI components, ESLint rules and TypeScript settings.

## Structure

```
fsi-web/
├── apps/
│   ├── admin/           # Admin portal (Next.js 14)
│   └── consumer/        # Consumer/student app (Next.js 14)
├── packages/
│   ├── config/          # Shared Firebase setup, env parsing and auth helpers
│   ├── ui/              # Shared React UI components and Tailwind preset
│   ├── eslint-config/   # Reusable ESLint configuration
│   └── tsconfig/        # Base TypeScript configuration and path aliases
├── .github/workflows/ci.yml   # CI workflow for lint, typecheck and build
├── turbo.json           # Turborepo pipeline configuration
├── pnpm-workspace.yaml  # pnpm workspace definition
├── package.json         # Root package with shared deps and scripts
└── README.md            # This file
```

## Getting Started

1. **Install dependencies**: make sure you have [pnpm](https://pnpm.io/) installed and run:

   ```bash
   pnpm install
   ```

2. **Configure Firebase**: create `.env.local` files under both `apps/admin` and `apps/consumer` with your Firebase project’s public configuration. You can copy from the templates below:

   ```bash
   # apps/admin/.env.local
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   # Optional analytics ID
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

   # Comma‑separated list of admin email addresses.  Users whose email is included
   # here will receive the `admin` role on their user document.
   NEXT_PUBLIC_ADMIN_ALLOWLIST=admin@frontendschool.in,devesh@example.com
   ```

   A corresponding `.env.local` file should also be created for `apps/consumer` with the same Firebase values.

3. **Run the apps locally**:

   ```bash
   pnpm dev
   ```

   This will start both applications concurrently. By default, the consumer app runs on [http://localhost:3000](http://localhost:3000) and the admin app runs on [http://localhost:3001](http://localhost:3001).

4. **Building for production**:

   ```bash
   pnpm build
   ```

   This will build all packages and apps. The compiled output for each app is stored in its respective `.next` directory.

## Shared Packages

### `@fsi/config`

Centralizes Firebase initialisation, environment variable validation and authentication helpers. It exposes:

- `env` – parsed and validated environment variables using **Zod**.
- `getFirebaseApp()` – returns a singleton Firebase app.
- `auth()` and `db()` – convenience functions to retrieve the Firebase Auth and Firestore instances.
- `signInWithGoogle()` and `signOut()` – helpers to initiate a Google OAuth login or sign the user out.
- `useUser()` – React hook wrapping Firebase Auth’s `onAuthStateChanged`.
- `ensureUserDocument(user)` – writes a `users/{uid}` record on first login, automatically assigning a `role` of either `admin` or `user` based on the configured allow list.
- `isAdmin(email)` – checks whether a given email belongs to the admin allowlist.

### `@fsi/ui`

Reusable React components styled with **Tailwind CSS**:

- `Button` – primary button component.
- `Card` – simple container with border and shadow.
- `Header` – top navigation bar that displays the logged‑in user and a sign‑in/out link.
- `LoadingSpinner` – basic animated spinner.
- `AuthGate` – wrapper component that redirects to the `/auth` page if the user is not signed in, and optionally enforces admin‑only access. It uses the `useUser()` hook and `isAdmin()` helper.

It also exports a Tailwind preset consumed by each app’s own `tailwind.config.js` so that utilities and customisations are consistent across projects.

### `@fsi/eslint-config`

Shared ESLint configuration extending Next.js core web vitals, recommended TypeScript rules and Prettier.

### `@fsi/tsconfig`

Base TypeScript configuration used by all packages and apps. Defines path aliases (`@ui/*` and `@config/*`) for cleaner imports and enforces strict compilation settings.

## Continuous Integration

The CI workflow defined in `.github/workflows/ci.yml` checks that the repository lints, typechecks and builds on every push and pull request. It uses Node 20 and pnpm to install dependencies.

## Future Improvements

- **Server‑side auth** – move towards SSR authentication using secure cookies and Firebase Admin SDK or NextAuth.
- **Role management UI** – provide a UI for assigning roles beyond the static allow list.
- **Emulator suite** – integrate Firebase emulators to enable offline development and automated testing.
