export function toggleClass(
  flag: boolean,
  toggleClass: string,
  dom: HTMLElement = document.documentElement
) {
  const className = dom.className.replace(toggleClass, "");
  dom.className = flag ? `${className} ${toggleClass}` : className;
}

export function setCssVar(
  prop: string,
  val: any,
  dom: HTMLElement = document.documentElement
) {
  dom.style.setProperty(prop, val);
}
