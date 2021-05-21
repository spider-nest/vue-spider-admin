import type { PropType } from "vue";

import PropTypes from "/@/utils/vue-types";

export default {
  addonAfter: PropTypes.VNodeChild,
  addonBefore: PropTypes.VNodeChild,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool.def(false),
  maxlength: PropTypes.number,
  prefix: PropTypes.VNodeChild,
  size: PropTypes.oneOf(["small", "large", "default"]).def("default"),
  suffix: PropTypes.VNodeChild,
  type: PropTypes.string.def("text"),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  allowClear: PropTypes.bool.def(true),

  placeholder: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
};
