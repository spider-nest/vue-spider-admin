import type { ModalFuncProps } from "ant-design-vue/lib/modal/Modal";

import {
  message as AMessage,
  notification as ANotification,
  Modal as AModal,
} from "ant-design-vue";

interface ModalOptionsEx extends Omit<ModalFuncProps, "iconType"> {
  iconType: "warning" | "success" | "error" | "info";
}

type ModalOptionsPartial = Partial<ModalOptionsEx> &
  Pick<ModalOptionsEx, "content">;

const margin = "24px";

AMessage.config({
  duration: 2.3,
  maxCount: 3,
  top: margin,
});

ANotification.config({
  bottom: margin,
  duration: 3.3,
  placement: "topRight",
  top: margin,
});

const modalOptions = () => {
  return {
    closable: true,
  };
};

function renderContent({ content }: Pick<ModalOptionsEx, "content">) {
  return <div innerHTML={`<div>${content as string}</div>`} />;
}

function createModalOptions(options: ModalOptionsPartial): ModalOptionsPartial {
  return {
    ...modalOptions(),
    ...options,
    content: renderContent(options),
  };
}

function SModalSuccess(options: ModalOptionsPartial) {
  return AModal.success(createModalOptions(options));
}

function SModalError(options: ModalOptionsPartial) {
  return AModal.error(createModalOptions(options));
}

function SModalInfo(options: ModalOptionsPartial) {
  return AModal.info(createModalOptions(options));
}

function SModalWarning(options: ModalOptionsPartial) {
  return AModal.warning(createModalOptions(options));
}

export function useInfoFeedback() {
  return {
    SMessage: AMessage,
    SNotification: ANotification,
    SModalSuccess,
    SModalError,
    SModalInfo,
    SModalWarning,
  };
}
