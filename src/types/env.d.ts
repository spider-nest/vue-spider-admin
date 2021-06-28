export declare interface ViteEnv {
  // .env
  VITE_APP_NAME: string;
  VITE_APP_SHORTNAME: string;
  VITE_API_PREFIX: string;
  VITE_MOCK: boolean;

  // .env.development
  VITE_SERVER_PORT?: number;

  // .env.production
  VITE_CONSOLE?: boolean;
}
