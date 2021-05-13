import type { App } from "vue";

import {
  GithubOutlined,
  CopyrightOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons-vue";

import SButton from "./button";
import SCheckbox from "./checkbox";
import SCol from "./col";
import CommonFooter from "./common-footer";
import SDropdown from "./dropdown";
import { SIcon, SvgIcon } from "./icon";
import { SInput, SInputPassword } from "./input";
import LocalePicker from "./locale-picker";
import Nameplate from "./nameplate";
import SRow from "./row";

const icons = [GithubOutlined, CopyrightOutlined, UserOutlined, LockOutlined];

const components = [
  SButton,
  SCheckbox,
  SCol,
  CommonFooter,
  SDropdown,
  SIcon,
  SvgIcon,
  SInput,
  SInputPassword,
  LocalePicker,
  Nameplate,
  SRow,
];

export function iconGlobalization(app: App) {
  icons.map((icon) => {
    app.component(`A${icon.displayName}`, icon);
  });
}

export function componentGlobalization(app: App) {
  components.map((component) => {
    app.component(component.name, component);
  });
}
