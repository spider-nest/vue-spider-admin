import type { MessageOptions, MessageReactive } from "naive-ui";

import { messageRef } from "@/router/guard/messageGuard";

const defaultMessageOptions: MessageOptions = {
  closable: true,
  duration: 3300,
};

function createMessageOptions(options?: MessageOptions) {
  return {
    ...defaultMessageOptions,
    ...(options || {}),
  };
}

export function useErrorMessage(
  content: string | (() => VueNode) = "操作失败",
  options?: MessageOptions
): MessageReactive {
  const messageOptions = createMessageOptions(options);
  return messageRef?.value?.error(content, messageOptions);
}

export function useInfoMessage(
  content: string | (() => VueNode),
  options?: MessageOptions
): MessageReactive {
  const messageOptions = createMessageOptions(options);
  return messageRef?.value?.info(content, messageOptions);
}

export function useLoadingMessage(
  content: string | (() => VueNode) = "处理中",
  options?: MessageOptions
): MessageReactive {
  const messageOptions = createMessageOptions(options);
  return messageRef?.value?.loading(content, messageOptions);
}

export function useSuccessMessage(
  content: string | (() => VueNode) = "操作成功",
  options?: MessageOptions
): MessageReactive {
  const messageOptions = createMessageOptions(options);
  return messageRef?.value?.success(content, messageOptions);
}

export function useWarningMessage(
  content: string | (() => VueNode),
  options?: MessageOptions
): MessageReactive {
  const messageOptions = createMessageOptions(options);
  return messageRef?.value?.warning(content, messageOptions);
}
