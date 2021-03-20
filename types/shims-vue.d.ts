declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production";
  }
}

declare let process: NodeJS.Process;

declare module "*.vue" {
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare module "*.less";

declare module "*.json";

declare module "moment/dist/locale/*" {
  import { LocaleSpecification } from "moment";
  const locale: LocaleSpecification & ReadonlyRecordable;
  export default locale;
}

declare module "ant-design-vue/es/locale/*" {
  import { Locale } from "ant-design-vue/types/locale-provider";
  const locale: Locale & ReadonlyRecordable;
  export default locale as Locale & ReadonlyRecordable;
}
