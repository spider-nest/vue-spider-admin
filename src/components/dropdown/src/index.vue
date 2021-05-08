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
            <template v-if="option.popConfirm">
              <PopConfirm v-bind="option.popConfirm">
                <MenuItemContent :option="option" />
              </PopConfirm>
            </template>
            <template v-else>
              <MenuItemContent :option="option" />
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

import MenuItemContent from "./menu-item-content.vue";
import PropTypes from "/@/utils/vue-types";

export default defineComponent({
  name: "SDropdown",
  components: {
    Dropdown,
    Menu,
    MenuItem: Menu.Item,
    MenuDivider: Menu.Divider,
    PopConfirm: Popconfirm,
    MenuItemContent,
  },
  inheritAttrs: false,
  props: {
    trigger: PropTypes.arrayOf(
      PropTypes.oneOf(["hover", "click", "contextmenu"])
    ).def(["hover"]),
    options: PropTypes.array.def([]),
    selectedKeys: PropTypes.arrayOf(PropTypes.string).def([]),
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
