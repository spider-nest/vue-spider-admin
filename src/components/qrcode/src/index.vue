<template>
  <div v-bind="binds">
    <component :is="tag" ref="qrCodeRef" />
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";

import type {
  QRCodeRenderersOptions,
  LogoType,
  QrcodeDoneEventParams,
} from "../types";

import { computed, defineComponent, ref, unref, watchEffect } from "vue";
import { toDataURL } from "qrcode";

import toCanvas from "./toCanvas";
import PropTypes from "/@/utils/vue-types";

export default defineComponent({
  name: "QrCode",
  inheritAttrs: false,
  props: {
    value: PropTypes.string.def(""),
    width: PropTypes.number.def(180),
    options: {
      type: Object as PropType<QRCodeRenderersOptions>,
      default: null,
    },
    logo: {
      type: [String, Object] as PropType<string | Partial<LogoType>>,
      default: "",
    },
    tag: {
      type: String as PropType<"canvas" | "img">,
      default: "canvas",
      validator: (value: string) => ["canvas", "img"].includes(value),
    },
  },
  emits: {
    done: (data: QrcodeDoneEventParams) => !!data,
    error: (error: Error) => !!error,
  },
  setup(props, { attrs, emit }) {
    const binds = computed(() => {
      return { ...attrs, ...props };
    });

    const qrCodeRef = ref<HTMLCanvasElement | HTMLImageElement | null>(null);

    async function createQrcode() {
      try {
        const { tag, value, options = {}, width, logo } = props;

        if (!unref(qrCodeRef)) return;

        if (tag === "canvas") {
          const url: string = await toCanvas({
            canvas: unref(qrCodeRef),
            width,
            logo: logo as any,
            content: value,
            options: options || {},
          });
          emit("done", {
            url,
            ctx: (unref(qrCodeRef) as HTMLCanvasElement).getContext("2d"),
          });
          return;
        } else if (tag === "img") {
          const url = await toDataURL(value, {
            errorCorrectionLevel: "H",
            width,
            ...options,
          });
          (unref(qrCodeRef) as HTMLImageElement).src = url;
          emit("done", { url });
        }
      } catch (error) {
        emit("error", error);
      }
    }

    watchEffect(() => {
      createQrcode();
    });

    return { binds, qrCodeRef };
  },
});
</script>
