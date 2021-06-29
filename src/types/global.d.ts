import type { VNodeChild, PropType as VuePropType } from "vue";

declare global {
  // vite define
  const __APP_INFO__: {
    version: string;
    buildTime: string;
  };
  const __VITE_ENV__: {
    appShortname: string;
  };

  declare type Recordable<T = any> = Record<string, T>;
  declare type Nullable<T> = T | null;
  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type IntervalHandle = ReturnType<typeof setInterval>;
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };

  // vue
  declare type PropType<T> = VuePropType<T>;
  declare type VueNode = VNodeChild | JSX.Element;
}
