import type { requestParams } from "../_util";

import { MockMethod } from "vite-plugin-mock";

import { SystemUserApi } from "../../services/enums/system/user";
import { failureResult, successfulResult, getRequestToken } from "../_util";

const { apiPrefix } = __VITE_ENV__;

export function createUserList() {
  return [
    {
      userId: 999,
      account: "spider",
      realName: "cnguu",
      avatar:
        "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/logo128.png",
      desc: "administrator",
      password: "123456",
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
      password: "123456",
      realName: "test user",
      avatar:
        "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/logo128.png",
      desc: "tester",
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
      const { account, password } = body;
      const user = createUserList().find(
        (item) => item.account === account && password === item.password
      );
      if (!user) {
        return failureResult("Incorrect account or password");
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
        return failureResult("Invalid token");
      }

      const user = createUserList().find((item) => item.token === token);
      if (!user) {
        return failureResult("Invalid user");
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
        return failureResult("Invalid token");
      }

      const user = createUserList().find((item) => item.token === token);
      if (!user) {
        return failureResult("Invalid user");
      }

      const codeList = createCodeList(user.userId);

      return successfulResult(codeList);
    },
  },
] as MockMethod[];
