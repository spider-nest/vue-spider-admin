<script lang="tsx">
import { defineComponent, unref } from "vue";
import { useRouter } from "vue-router";

import { isArray } from "@/utils/is";

export default defineComponent({
  name: "Redirect",
  setup() {
    const { currentRoute, replace } = useRouter();

    const { params, query } = unref(currentRoute);
    const { path } = params;

    const _path = isArray(path) ? path.join("/") : path;

    replace({
      path: "/" + _path,
      query,
    });

    return {};
  },
});
</script>
