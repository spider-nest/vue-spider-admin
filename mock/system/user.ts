import { MockMethod } from "vite-plugin-mock";

import { failureResult, successfulResult } from "../_util";

function createUserList() {
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

export default [
  {
    url: "/api/system/user/login",
    timeout: 200,
    method: "post",
    response: ({ body }) => {
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
    url: "/api/system/user/info",
    method: "get",
    response: ({ query }) => {
      const { userId } = query;
      const user = createUserList().find((item) => item.userId === userId);
      if (!user) {
        return failureResult("Get failure");
      }
      return successfulResult(user);
    },
  },
] as MockMethod[];
