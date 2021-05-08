<template>
  <Dropdown v-bind="$attrs" :trigger="trigger">
    <span>
      <slot />
    </span>
    <template #overlay>
      <Menu :selectedKeys="selectedKeys">
        <template v-for="option in options" :key="`${option.event}`">
          <MenuItem
            v-bind="handleBind(option.event)"
            :disabled="option.disabled"
            @click="onClickMenu(option)"
          >
            <PopConfirm v-if="popConfirm && option.popConfirm" v-bind="option">
              <SIcon v-if="option.icon" :icon="option.icon" />
              <span>{{ option.title }}</span>
            </PopConfirm>
            <template v-else>
              <SIcon v-if="option.icon" :icon="option.icon" />
              <span>{{ option.title }}</span>
            </template>
          </MenuItem>
          <MenuDivider v-if="option.divider" :key="`divider-${option.event}`" />
        </template>
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import type { DropdownMenu, DropdownMenuEvent } from "../types";

import { defineComponent } from "vue";
import { Dropdown, Menu, Popconfirm } from "ant-design-vue";

import { SIcon } from "/@/components/icon";
import PropTypes from "/@/utils/vue-types";

export default defineComponent({
  name: "SDropdown",
  components: {
    Dropdown,
    Menu,
    MenuItem: Menu.Item,
    MenuDivider: Menu.Divider,
    PopConfirm: Popconfirm,
    SIcon,
  },
  inheritAttrs: false,
  props: {
    trigger: PropTypes.arrayOf(
      PropTypes.oneOf(["hover", "click", "contextmenu"])
    ).def(["hover"]),
    options: PropTypes.array.def([]),
    selectedKeys: PropTypes.arrayOf(PropTypes.string).def([]),
    popConfirm: PropTypes.looseBool.def(false),
  },
  emits: ["clickMenu"],
  setup(props, { emit }) {
    const onClickMenu = (dropdownMenuItem: DropdownMenu) => {
      const { event } = dropdownMenuItem;
      emit(
        "clickMenu",
        props.options.find((option) => option.event === event)
      );
      dropdownMenuItem.onClick?.();
    };

    const handleBind = (key: DropdownMenuEvent) => {
      return { key };
    };

    return {
      onClickMenu,
      handleBind,
    };
  },
});
</script>
