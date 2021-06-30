import type { MessageOptions, MessageReactive } from "naive-ui";

import { useMessage as useNaiveMessage } from "naive-ui";

const defaultMessageOptions: MessageOptions = {
  closable: true,
  duration: 3300,
};

const message = useNaiveMessage();

function createMessageOptions(options?: MessageOptions) {
  return {
    ...defaultMessageOptions,
    ...(options || {}),
  };
}

export function useErrorMessage(
  content: string | (() => VueNode),
  options?: MessageOptions
): MessageReactive {
  const messageOptions = createMessageOptions(options);
  return message.error(content, messageOptions);
}

export function useInfoMessage(
  content: string | (() => VueNode),
  options?: MessageOptions
): MessageReactive {
  const messageOptions = createMessageOptions(options);
  return message.info(content, messageOptions);
}

export function useLoadingMessage(
  content: string | (() => VueNode),
  options?: MessageOptions
): MessageReactive {
  const messageOptions = createMessageOptions(options);
  return message.loading(content, messageOptions);
}

export function useSuccessMessage(
  content: string | (() => VueNode),
  options?: MessageOptions
): MessageReactive {
  const messageOptions = createMessageOptions(options);
  return message.success(content, messageOptions);
}

export function useWarningMessage(
  content: string | (() => VueNode),
  options?: MessageOptions
): MessageReactive {
  const messageOptions = createMessageOptions(options);
  return message.warning(content, messageOptions);
}
