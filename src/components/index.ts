import type { App } from "vue";

import {
  GithubOutlined,
  CopyrightOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons-vue";
// import { Modal } from "ant-design-vue";

const icons = [GithubOutlined, CopyrightOutlined, UserOutlined, LockOutlined];
export function iconGlobalization(app: App) {
  icons.map((icon) => {
    app.component(`A${icon.displayName || icon.name}`, icon);
  });
}

// const components = [Modal];
// export function componentGlobalization(app: App) {
//   components.map((component) => {
//     app.component(`A${component.name}`, component);
//   });
// }
