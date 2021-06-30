import { isArray } from "@/utils/is";

export function treeMapEach(
  data: any,
  { children = "children", conversion }: { children?: string; conversion: Fn }
) {
  const haveChildren = isArray(data[children]) && data[children].length > 0;
  const conversionData = conversion(data) || {};
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((i: number) =>
        treeMapEach(i, {
          children,
          conversion,
        })
      ),
    };
  } else {
    return {
      ...conversionData,
    };
  }
}

export function treeMap<T = any>(
  treeData: T[],
  opt: { children?: string; conversion: Fn }
): T[] {
  return treeData.map((item) => treeMapEach(item, opt));
}
