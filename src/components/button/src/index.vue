<template>
  <Button v-bind="binds" :class="classes">
    <slot name="icon" />
    <slot />
  </Button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Button } from "ant-design-vue";

import PropTypes, { withUndefined } from "/@/utils/vue-types";

export default defineComponent({
  name: "SButton",
  components: { Button },
  inheritAttrs: false,
  props: {
    disabled: PropTypes.looseBool,
    ghost: PropTypes.looseBool,
    htmlType: PropTypes.oneOf(["submit", "button", "reset"]).def("button"),
    loading: withUndefined(
      PropTypes.oneOfType([PropTypes.looseBool, PropTypes.object])
    ),
    shape: PropTypes.oneOf(["circle", "circle-outline", "round"]),
    size: PropTypes.oneOf(["large", "default", "small"]).def("default"),
    type: PropTypes.oneOf([
      "default",
      "primary",
      "ghost",
      "dashed",
      "danger",
      "link",
    ]),
    block: PropTypes.looseBool,

    linkType: PropTypes.oneOf([
      "info",
      "default",
      "success",
      "warning",
      "danger",
    ]).def("info"),
  },
  setup(props, { attrs }) {
    const className = "spider-btn";
    const classes = computed(() => {
      const { type } = props;
      return {
        [className]: true,
        [`${className}--success`]: type === "success",
        [`${className}--warning`]: type === "warning",
        [`${className}--info`]: type === "info",
        [`${className}--link__${props.linkType}`]: type === "link",
      };
    });

    const binds = computed(() => {
      return { ...attrs, ...props };
    });

    return { binds, classes };
  },
});
</script>

<style lang="less">
@spider-btn-prefix-cls: ~"@{spider-prefix}-btn";
@ant-btn-prefix-cls: ~"@{ant-prefix}-btn";

@btn-success-color: #ffffff;
@btn-success-bg: @success-color;

@btn-warning-color: #ffffff;
@btn-warning-bg: @warning-color;

@btn-info-color: #ffffff;
@btn-info-bg: @info-color;

.button-color(@color; @background; @border) {
  color: @color;
  background-color: @background;
  border-color: @border;

  > a:only-child {
    color: currentColor;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      content: "";
    }
  }
}

.button-disabled(@color: @btn-disable-color; @background: @btn-disable-bg; @border: @btn-disable-border) {
  &-disabled,
  &.disabled,
  &[disabled] {
    &,
    &:hover,
    &:focus,
    &:active,
    &.active {
      .button-color(@color; @background; @border);

      text-shadow: none;
      box-shadow: none;
    }
  }
}

.button-variant(@color; @background) {
  .button-color(@color; @background; @background);

  text-shadow: @btn-text-shadow;
  box-shadow: @btn-primary-shadow;

  &:hover,
  &:focus {
    .button-color(
      @color; ~`colorPalette("@{background}", 5) `; ~`colorPalette("@{background}", 5) `
    );
  }

  &:active,
  &.active {
    .button-color(
      @color; ~`colorPalette("@{background}", 7) `; ~`colorPalette("@{background}", 7) `
    );
  }

  .button-disabled();
}

.button-group-variant(@color) {
  .ant-btn-group {
    &:not(:first-child):not(:last-child) {
      border-right-color: @color;
      border-left-color: @color;

      &:disabled {
        border-color: @btn-default-border;
      }
    }

    &:first-child {
      &:not(:last-child) {
        border-right-color: @color;

        &[disabled] {
          border-right-color: @btn-default-border;
        }
      }
    }
  }

  .ant-btn-group &:last-child:not(:first-child),
  .ant-btn-group & + & {
    border-left-color: @color;

    &[disabled] {
      border-left-color: @btn-default-border;
    }
  }
}

.button-link-color(@color) {
  color: @color;

  > a:only-child {
    color: currentColor;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      content: "";
    }
  }
}

.button-link-disabled(@color: @btn-disable-color) {
  &-disabled,
  &.disabled,
  &[disabled] {
    &,
    &:hover,
    &:focus,
    &:active,
    &.active {
      .button-link-color(@color);

      text-shadow: none;
      box-shadow: none;
    }
  }
}

.button-variant-link(@color) {
  color: @color;

  &:hover,
  &:focus {
    .button-link-color(~`colorPalette("@{color}", 5) `);
  }

  &:active,
  &.active {
    .button-link-color(~`colorPalette("@{color}", 7) `);
  }

  .button-link-disabled();
}

.@{spider-btn-prefix-cls},
a.@{spider-btn-prefix-cls},
.@{ant-btn-prefix-cls},
a.@{ant-btn-prefix-cls} {
  // success button
  &-success,
  &--success {
    .button-variant(@btn-success-color; @btn-success-bg);
    .button-group-variant(@success-5);
  }

  // warning button
  &-warning,
  &--warning {
    .button-variant(@btn-warning-color; @btn-warning-bg);
    .button-group-variant(@warning-5);
  }

  // info button
  &-info,
  &--info {
    .button-variant(@btn-info-color; @btn-info-bg);
    .button-group-variant(@primary-5);
  }

  // link button
  &--link {
    &__default {
      .button-variant-link(@text-color);
    }

    &__success {
      .button-variant-link(@success-color);
    }

    &__warning {
      .button-variant-link(@warning-color);
    }

    &__info {
      .button-variant-link(@info-color);
    }

    &__danger {
      .button-variant-link(@error-color);
    }
  }
}
</style>
