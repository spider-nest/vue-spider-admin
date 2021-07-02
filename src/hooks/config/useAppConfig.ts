import { namespace, prefix } from "@/utils/cssr";

export default function useAppConfig() {
  return {
    styleNamespace: namespace,
    stylePrefix: prefix,
  };
}
