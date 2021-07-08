import type { requestParams } from "../_util";

import { MockMethod } from "vite-plugin-mock";

import { SystemUserApi } from "../../services/enums/system/user";
import {
  apiPrefix,
  failureResult,
  successfulResult,
  getRequestToken,
} from "../_util";

export function createUserList() {
  return [
    {
      userId: 999,
      account: "spider",
      email: "spider",
      phone: 123456789012,
      code: "spider",
      realName: "spider",
      avatar:
        "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/logo128.png",
      desc: "administrator",
      password: "spider",
      token: "token-administrator",
      roles: [
        {
          roleName: "administrator",
          value: 1,
        },
      ],
    },
    {
      userId: 1000,
      account: "test",
      email: "test",
      phone: 123456789012,
      code: "test",
      realName: "test user",
      avatar:
        "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/logo128.png",
      desc: "tester",
      password: "test",
      token: "token-test",
      roles: [
        {
          roleName: "tester",
          value: 2,
        },
      ],
    },
  ];
}

function createCodeList(userId) {
  const codeList = {
    999: ["123", "456"],
    1000: ["789"],
  };
  return codeList[userId];
}

export default [
  {
    url: `${apiPrefix}${SystemUserApi.Login}`,
    timeout: 200,
    method: "post",
    response: ({ body }: requestParams) => {
      const { email, password, phone, code } = body;
      const user = createUserList().find((item) =>
        email
          ? item.email === email && password === item.password
          : item.phone === phone && code
      );
      if (!user) {
        return failureResult("帐户或密码不正确");
      }

      const {
        userId,
        account: userAccount,
        token,
        realName,
        desc,
        roles,
      } = user;

      return successfulResult({
        roles,
        userId,
        account: userAccount,
        token,
        realName,
        desc,
      });
    },
  },
  {
    url: `${apiPrefix}${SystemUserApi.Info}`,
    timeout: 200,
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return failureResult("token 无效");
      }

      const user = createUserList().find((item) => item.token === token);
      if (!user) {
        return failureResult("用户无效");
      }

      return successfulResult(user);
    },
  },
  {
    url: `${apiPrefix}${SystemUserApi.CodeList}`,
    timeout: 200,
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return failureResult("token 无效");
      }

      const user = createUserList().find((item) => item.token === token);
      if (!user) {
        return failureResult("用户无效");
      }

      const codeList = createCodeList(user.userId);

      return successfulResult(codeList);
    },
  },
] as MockMethod[];
