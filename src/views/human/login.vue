<template>
  <SButton type="default">默认</SButton>
  <SButton type="primary">主要</SButton>
  <SButton type="success">成功</SButton>
  <SButton type="warning">警告</SButton>
  <SButton type="danger">危险</SButton>
  <SButton type="dashed">dashed</SButton>
  <SButton type="link">link</SButton>
  <SButton type="link" link-type="default">link default</SButton>
  <SButton type="link" link-type="success">link success</SButton>
  <SButton type="link" link-type="warning">link warning</SButton>
  <SButton type="link" link-type="danger">link danger</SButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SButton from "/@/components/button";

export default defineComponent({
  name: "HumanLogin",
  components: { SButton },
});
</script>
