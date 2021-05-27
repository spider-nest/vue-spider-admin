import { HttpCodeEnum } from "/@/enums/http";

export default {
  [HttpCodeEnum.UNAUTHORIZED]: "Unauthorized",
  [HttpCodeEnum.NOT_FOUND]: "Not found",
  [HttpCodeEnum.REQUEST_TIMEOUT]: "Request timeout",
  [HttpCodeEnum.GATEWAY_TIMEOUT]: "Gateway timeout",
};
