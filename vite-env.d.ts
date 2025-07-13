// vite-env.d.ts

/**
 * Defines the shape of `import.meta.env` for Vite projects.
 * This file provides type safety for environment variables accessed via `import.meta.env`.
 *
 * This manual definition is provided because the original /// <reference types="vite/client" />
 * was reported to cause a "Cannot find type definition file" error.
 * This ensures the necessary types are available for properties like `import.meta.env.DEV`.
 */

interface ImportMetaEnv {
  /**
   * The mode Vite is running in (e.g., 'development', 'production').
   * @example 'development'
   */
  MODE: string;

  /**
   * The base public path when served in development or production.
   * @example '/'
   */
  BASE_URL: string;

  /**
   * A boolean indicating if the app is running in production mode.
   * Vite sets this based on the `mode` option.
   * @example true (if mode is 'production')
   */
  PROD: boolean;

  /**
   * A boolean indicating if the app is running in development mode.
   * Vite sets this based on the `mode` option.
   * This is used in `ErrorBoundary.tsx`.
   * @example true (if mode is 'development')
   */
  DEV: boolean;

  /**
   * A boolean indicating if the app is running in Server-Side Rendering (SSR) context.
   * @example false (for typical client-side apps)
   */
  SSR: boolean;

  // If you define custom environment variables in a .env file (e.g., VITE_API_URL),
  // and access them via `import.meta.env.VITE_API_URL`, you should add them here for type safety:
  // readonly VITE_API_URL: string;
  // readonly VITE_SOME_OTHER_VAR: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;

  /**
   * Vite-specific `import.meta.glob` for importing multiple modules.
   * Uncomment and adjust if you use this feature.
   */
  // readonly glob: (pattern: string, options?: { eager?: boolean; import?: string; query?: string | Record<string,any>; }) => Record<string, () => Promise<any> | any>;
}

// Note: The `process.env.API_KEY` used in `App.tsx` (via vite.config.js `define`) is typed
// by the separate `env.d.ts` file, which defines `NodeJS.ProcessEnv`.
// This `vite-env.d.ts` file is specifically for `import.meta.env`.