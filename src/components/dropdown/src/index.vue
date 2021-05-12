<template>
  <ADropdown v-bind="$attrs" :trigger="trigger">
    <span>
      <slot />
    </span>
    <template #overlay>
      <AMenu :selectedKeys="selectedKeys">
        <template v-for="option in options" :key="`${option.event}`">
          <AMenuItem
            v-bind="handleBind(option.event)"
            :disabled="option.disabled"
            @click="onClickMenu(option)"
          >
            <template v-if="option.popConfirm">
              <APopConfirm v-bind="option.popConfirm">
                <MenuItemContent :option="option" />
              </APopConfirm>
            </template>
            <template v-else>
              <MenuItemContent :option="option" />
            </template>
          </AMenuItem>
          <AMenuDivider
            v-if="option.divider"
            :key="`divider-${option.event}`"
          />
        </template>
      </AMenu>
    </template>
  </ADropdown>
</template>

<script lang="ts">
import type { PropType } from "vue";

import type { DropdownMenu, DropdownMenuEvent } from "../types";

import { defineComponent } from "vue";
import {
  Dropdown as ADropdown,
  Menu as AMenu,
  Popconfirm as APopConfirm,
} from "ant-design-vue";

import MenuItemContent from "./menu-item-content.vue";
import PropTypes from "/@/utils/vue-types";

export default defineComponent({
  name: "SDropdown",
  components: {
    ADropdown,
    AMenu,
    AMenuItem: AMenu.Item,
    AMenuDivider: AMenu.Divider,
    APopConfirm,
    MenuItemContent,
  },
  inheritAttrs: false,
  props: {
    trigger: PropTypes.arrayOf(
      PropTypes.oneOf(["hover", "click", "contextmenu"])
    ).def(["hover"]),
    options: {
      type: Array as PropType<(DropdownMenu & Recordable)[]>,
      default: () => [],
    },
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
