import { useInfoFeedback } from "/@/hooks/useInfoFeedback";
import { useI18n } from "/@/hooks/useLocale";
import { useUserStoreWithout } from "/@/store/modules/user";
import { HttpCodeEnum } from "/@/enums/http";

const { SMessage } = useInfoFeedback();

export default function (status: number, msg: string): void {
  const { t } = useI18n();
  const error = (code) => SMessage.error(t(`http.${code}`));

  if (status in HttpCodeEnum) {
    error(status);
    if (status === HttpCodeEnum.UNAUTHORIZED) {
      const userStore = useUserStoreWithout();
      userStore.setToken(undefined);
    }
  } else {
    SMessage.error(msg);
  }
}
