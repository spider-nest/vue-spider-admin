export type DropdownMenuEvent = string | number;

export interface DropdownMenu {
  event: DropdownMenuEvent; // key
  title: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  popConfirm?: boolean;
  to?: string;
  onClick?: Fn;
}
