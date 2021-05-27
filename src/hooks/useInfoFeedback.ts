import {
  message as AMessage,
  notification as ANotification,
} from "ant-design-vue";

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

export function useInfoFeedback() {
  return {
    SMessage: AMessage,
    SNotification: ANotification,
  };
}
