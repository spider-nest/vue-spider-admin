import type { App } from "vue";
import type { I18nOptions, I18n } from "vue-i18n";

import { createI18n } from "vue-i18n";

import { setHtmlLang, setLoadPool } from "/@/hooks/useLocale";
import { useLocaleStoreWithout } from "/@/store/modules/locale";
import { localeSetting } from "/@/settings/locale";

export let i18n: ReturnType<typeof createI18n>;

const { fallback, availableLocales } = localeSetting;

async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = useLocaleStoreWithout();
  const locale = localeStore.getLocale;
  const defaultLocal = await import(`./lang/${locale}.ts`);
  const message = defaultLocal.default?.message ?? {};

  setHtmlLang(locale);
  setLoadPool((loadPool) => {
    loadPool.push(locale);
  });

  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: message,
    },
    availableLocales: availableLocales,
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

export async function setupLocale(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options) as I18n;
  app.use(i18n);
}
