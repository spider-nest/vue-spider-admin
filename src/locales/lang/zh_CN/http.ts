import { HttpCodeEnum } from "/@/enums/http";

export default {
  [HttpCodeEnum.UNAUTHORIZED]: "未经许可",
  [HttpCodeEnum.NOT_FOUND]: "无法找到网页",
  [HttpCodeEnum.REQUEST_TIMEOUT]: "网络超时",
  [HttpCodeEnum.GATEWAY_TIMEOUT]: "服务超时",

  systemFailure: "系统故障",
};
