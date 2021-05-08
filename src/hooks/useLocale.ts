import { computed, unref } from "vue";
import moment from "moment";

import { i18n } from "/@/locales";
import { useLocaleStoreWithout } from "/@/store/modules/locale";

type I18nGlobalTranslation = {
  (key: string): string;
  (key: string, locale: string): string;
  (key: string, locale: string, list: unknown[]): string;
  (key: string, locale: string, named: Record<string, unknown>): string;
  (key: string, list: unknown[]): string;
  (key: string, named: Record<string, unknown>): string;
};

interface LangModule {
  message: Recordable;
  momentLocale: Recordable;
  momentLocaleName: string;
}
type I18nTranslationRestParameters = [string, any];

// This function is only used for routing and menus
export const t = (key: string) => key;

const loadLocalePool: LocaleType[] = [];

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithout();

  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  localeStore.setLocaleInfo({ locale });
  document.querySelector("html")?.setAttribute("lang", locale);
}

export function useLocale() {
  const localeStore = useLocaleStoreWithout();
  const getLocale = computed(() => localeStore.getLocale);
  const getShowLocalePicker = computed(() => localeStore.getShowPicker);

  const getAntdLocale = computed(() => {
    return i18n.global.getLocaleMessage("zh_CN")?.antDesignLocale ?? {};
  });

  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale);
      return locale;
    }
    const langModule = ((await import(`/@/locales/lang/${locale}.ts`)) as any)
      .default as LangModule;
    if (!langModule) return;

    const { message, momentLocale, momentLocaleName } = langModule;

    globalI18n.setLocaleMessage(locale, message);
    moment.updateLocale(momentLocaleName, momentLocale);
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    return locale;
  }

  return {
    getLocale,
    getShowLocalePicker,
    getAntdLocale,
    changeLocale,
  };
}

function getKey(namespace: string | undefined, key: string) {
  if (!namespace) {
    return key;
  }
  if (key.startsWith(namespace)) {
    return key;
  }
  return `${namespace}.${key}`;
}

export function useI18n(
  namespace?: string
): {
  t: I18nGlobalTranslation;
} {
  const normalFn = {
    t: (key: string) => {
      return getKey(namespace, key);
    },
  };

  if (!i18n) {
    return normalFn;
  }

  const { t, ...methods } = i18n.global;

  const tFn: I18nGlobalTranslation = (key: string, ...arg: any[]) => {
    if (!key) return "";
    if (!key.includes(".") && !namespace) return key;
    return t(getKey(namespace, key), ...(arg as I18nTranslationRestParameters));
  };
  return {
    ...methods,
    t: tFn,
  };
}
