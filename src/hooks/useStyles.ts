import { useAppProviderContext } from "/@/hooks/useAppContext";

export function useStyles(name: string) {
  const values = useAppProviderContext();

  return {
    prefixCls: `${values.prefixCls}-${name}`,
    prefixVar: values.prefixCls,
  };
}
