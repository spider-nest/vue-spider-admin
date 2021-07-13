export interface Breadcrumb {
  key: string;
  icon?: string;
  label?: string;
  disabled?: boolean;
  path?: string;
  children?: Breadcrumb[];
}
