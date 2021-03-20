import type { App } from "vue";
import type { I18nOptions } from "vue-i18n";

import { createI18n } from "vue-i18n";

export let i18n: ReturnType<typeof createI18n>;

async function createI18nOptions(): Promise<I18nOptions> {
  const locale = "zh_CN";
  const defaultLocal = await import(`./lang/${locale}.ts`);
  const message = defaultLocal.default?.message ?? {};

  return {
    legacy: false,
    locale,
    fallbackLocale: locale,
    messages: {
      [locale]: message,
    },
    availableLocales: ["zh_CN", "en"],
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

export async function setupLocale(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options);
  app.use(i18n);
}
