import { computed, ref } from "vue";

export enum FormStateEnum {
  PASSWORD_LOGIN,
  PHONE_LOGIN,
  QR_CODE_LOGIN,
}

const defaultState = FormStateEnum.PASSWORD_LOGIN;
const sState = ref(defaultState);

export function useState() {
  const setState = (state: FormStateEnum) => {
    sState.value = state;
  };

  const getState = computed(() => sState.value);

  const resetState = () => {
    setState(defaultState);
  };

  return { setState, getState, resetState };
}
