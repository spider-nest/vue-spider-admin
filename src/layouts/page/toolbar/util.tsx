import { RouterLink } from "vue-router";

import { SIcon } from "@/components";

import { commonLight } from "@/styles/common";

const { marginBase } = commonLight;

export const renderLabel = (option) => {
  const { label, path, iconName } = option;

  const Content = [
    iconName ? (
      <SIcon
        name={iconName}
        style={{
          verticalAlign: "text-top",
          marginRight: `${marginBase / 4}px`,
        }}
      />
    ) : null,
    label,
  ];

  if (!path) return Content;

  return <RouterLink to={path}>{Content}</RouterLink>;
};
