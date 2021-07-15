import { useUserStoreWithout } from "@/store/modules/user";

import { useErrorMessage } from "@/hooks/web/useMessage";

export default function checkStatus(status: number, msg: string): void {
  const userStore = useUserStoreWithout();
  let errMessage = "未知状态";

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    case 401:
      errMessage = "未经许可";
      userStore.logout();
      break;
    case 403:
      errMessage = "禁止访问";
      break;
    case 404:
      errMessage = "找不到资源";
      break;
    case 408:
      errMessage = "网络超时";
      break;
    case 500:
      errMessage = "服务不可用";
      break;
    case 503:
      errMessage = "服务不可用";
      break;
    case 504:
      errMessage = "网络超时";
      break;
    default:
      break;
  }

  useErrorMessage(errMessage);
}
