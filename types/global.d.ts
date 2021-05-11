declare global {
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      homepage: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  declare interface Window {
    __APP__: App<Element>;
  }

  declare type Recordable<T = any> = Record<string, T>;

  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };

  declare type TimeoutHandle = ReturnType<typeof setTimeout>;

  declare type IntervalHandle = ReturnType<typeof setInterval>;

  declare interface ViteEnv {
    VITE_PORT: number;
    VITE_APP_NAME: string;
    VITE_APP_SHORT_NAME: string;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
    VITE_DROP_CONSOLE: boolean;
    VITE_BUILD_COMPRESS: "gzip" | "brotli" | "none";
    VITE_LEGACY: boolean;
    VITE_IMAGEMIN: boolean;
  }

  declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
  }
}
