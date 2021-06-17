import type { LocaleType } from "/#/config";

import { computed, unref } from "vue";

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

type I18nTranslationRestParameters = [string, any];

export function setHtmlLang(locale: LocaleType) {
  document.querySelector("html")?.setAttribute("lang", locale);
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithout();
  localeStore.setLocaleInfo({ locale });
}

export function useLocale() {
  const localeStore = useLocaleStoreWithout();
  const getLocale = computed(() => localeStore.getLocale);
  const getShowLocalePicker = computed(() => localeStore.getShowPicker);

  const getAntdLocale = computed(() => {
    return (
      i18n.global.getLocaleMessage(unref(getLocale))?.antDesignLocale ?? {}
    );
  });

  function changeLocale(locale: LocaleType) {
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

export function useI18n(namespace?: string): {
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
