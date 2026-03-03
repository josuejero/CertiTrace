declare interface ImportMetaEnv {
  readonly VITE_MAINTENANCE_MODE?: string;
  readonly VITE_MAINTENANCE_MESSAGE?: string;
  readonly BASE_URL: string;
  readonly [key: string]: string | undefined;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
