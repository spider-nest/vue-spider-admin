<script lang="tsx">
import { defineComponent } from "vue";
import { GithubOutlined } from "@ant-design/icons";

export default defineComponent({
  name: "CommonFooter",
  render() {
    return () => {
      return <GithubOutlined />;
    };
  },
});
</script>
