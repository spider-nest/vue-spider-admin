import { useLocale } from "@/hooks";

const { t } = useLocale;

const BasicLayout = () => import("@/layouts/basic.vue");

export const basicRoutes = [
  {
    path: "/",
    name: "Index",
    redirect: "/home",
  },
  {
    path: "/human-login",
    name: "HumanLogin",
    component: () => import("@/views/human/login.vue"),
    meta: {
      title: t("routes.login"),
    },
  },
  {
    path: "/redirect",
    name: "Redirect",
    component: BasicLayout,
    meta: {
      breadcrumb: false,
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "RedirectAll",
        component: () => import("@/views/redirect.vue"),
        meta: {
          breadcrumb: false,
        },
      },
    ],
  },
];

export const asyncRoutes = [];
